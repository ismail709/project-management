<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "parent_task_id",
        "sprint_id",
        "project_id",
        "task_title",
        "task_description",
        "task_type_id",
        "task_priority",
        "task_status",
        "estimated_days",
        "actual_days",
        "created_by"
    ];

    public function sprint()
    {
        return $this->belongsTo(Sprint::class);
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function parentTask()
    {
        return $this->belongsTo(Task::class, "parent_task_id");
    }
    public function type()
    {
        return $this->belongsTo(TaskType::class,'task_type_id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, "created_by");
    }
    public function assignedTo(){
        return $this->belongsToMany(User::class,"task_assignments");
    }
}
