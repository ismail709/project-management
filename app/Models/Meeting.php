<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Meeting extends Model
{
    /** @use HasFactory<\Database\Factories\MeetingFactory> */
    use HasFactory,SoftDeletes;

    protected $fillable = [
        "sprint_id",
        "project_id",
        "summary",
        "type"
    ];

    public function sprint(){
        return $this->belongsTo(Sprint::class);
    }
    public function project(){
        return $this->belongsTo(Project::class);
    }
}
