<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialist extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function technicians()
    {
        return $this->belongsToMany(Technician::class, 'technician_specialists');
    }

    public function getImageAttribute($image)
    {
        return asset('storage/specialists/' . $image);
    }

}
