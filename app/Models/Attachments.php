<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attachments extends Model
{
    /** @use HasFactory<\Database\Factories\AttachmentsFactory> */
    use HasFactory,SoftDeletes;

    protected $fillable = [
        "task_id",
        "attachment_path",
        "uploaded_by"
    ];

    public function task(){
        return $this->belongsTo(Task::class);
    }
    public function uploadedBy(){
        return $this->belongsTo(User::class,'uploaded_by');
    }
}
