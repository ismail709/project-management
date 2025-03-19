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
}
