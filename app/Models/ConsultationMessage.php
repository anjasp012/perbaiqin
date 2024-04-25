<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultationMessage extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function consultation()
    {
        return $this->belongsTo(Consultation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'recommend_product_id');
    }

    public function getImageAttribute($image)
    {
        if (!$image) {

            return null;
        }
        return asset('storage/messages/' . $image) ?? null;
    }

    // public function getCreatedAtAttribute($created_at)
    // {

    //     $now = Carbon::now();
    //     $created_at = Carbon::parse($created_at);
    //     if ($now->diffInRealMinutes($created_at) < 5) {
    //         $timeAgo = $created_at->diffForHumans($now);
    //     } else {
    //         // Jika lebih dari beberapa detik, tampilkan dalam format yang diinginkan
    //         $timeAgo = $created_at->isoFormat('dddd, D MMM YYYY, HH:mm');
    //     }

    //     return $timeAgo;
    // }
}
