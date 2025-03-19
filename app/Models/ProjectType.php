<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectType extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectTypeFactory> */
    use HasFactory,SoftDeletes;

    protected $fillable = ["project_type_name"];
}
