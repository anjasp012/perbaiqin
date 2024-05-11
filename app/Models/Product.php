<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];


    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function rateReviews()
    {
        return $this->hasMany(ProductReview::class);
    }


    public function getImageAttribute($image)
    {
        return asset('storage/' . $image);
    }
}
