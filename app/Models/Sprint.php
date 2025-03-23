<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sprint extends Model
{
    /** @use HasFactory<\Database\Factories\SprintFactory> */
    use HasFactory,SoftDeletes;

    protected $fillable = [
        "project_id",
        "sprint_name",
        "start_date",
        "end_date",
        "sprint_status"
    ] ;

    public function project(){
        return $this->belongsTo(Project::class);
    }
    public function tasks(){
        return $this->hasMany(Task::class)->with('assignedTo');
    }
}
