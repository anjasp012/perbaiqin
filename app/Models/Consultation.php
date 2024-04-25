<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }

    public function messages()
    {
        return $this->hasMany(ConsultationMessage::class);
    }

    public function payments()
    {
        return $this->hasMany(ConsultationPayment::class);
    }

    public function getStatus()
    {
        return $this->status;
    }
}
