<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // public function tags()
    // {
    //     return $this->belongsToMany(Tag::class);
    // }

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }
}
