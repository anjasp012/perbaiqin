<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaboration extends Model
{
    use HasFactory;

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }

    public function rateReviews()
    {
        return $this->hasMany(CollaborationReview::class);
    }
}
