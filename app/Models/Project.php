<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "user_id",
        "project_name",
        "project_key",
        "project_description",
        "project_type_id",
        "start_date",
        "end_date"
    ];

    public function owner()
    {
        return $this->belongsTo(User::class,"user_id");
    }
    public function projectType()
    {
        return $this->belongsTo(ProjectType::class);
    }

    public function sprints(){
        return $this->hasMany(Sprint::class);
    }

    public function teams(){
        return $this->hasMany(Team::class);
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function users(){
        return $this->belongsToMany(User::class,'project_user');
    }

    protected static function booted(){
        static::creating(function (Project $project) {
            // project key init
            $projectKey = "";
            // get words
            $words = explode(" ", $project->project_name);
            // get initial characters
            foreach ($words as $word) {
                $projectKey .= strtoupper(substr($word, 0, 1));
            }
            // generate random number
            do {
                $rand_int = rand(100, 999);
            } while (self::where("project_key", $projectKey . '-' . $rand_int)->exists());
            // set the project key
            $project->project_key = $projectKey . '-' . $rand_int;
        });
        static::created(function (Project $project) {
            $project->users()->attach($project->user_id);
        });
    }
}
