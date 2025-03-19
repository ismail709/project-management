<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory,SoftDeletes;


    protected $fillable = ["team_name"];
    
    public function members(){
        return $this->belongsToMany(User::class,"team_members");
    }
}
