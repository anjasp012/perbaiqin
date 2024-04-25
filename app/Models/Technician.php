<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Technician extends Authenticatable
{
    use HasFactory;
    public $preventsLazyLoading = true;
    protected $guarded = ['id'];
    
    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }

    public function consultationMessages()
    {
        return $this->hasMany(ConsultationMessage::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function specialists()
    {
        return $this->belongsToMany(Specialist::class, 'technician_specialists');
    }

    public function getImageAttribute($image)
    {
        return asset('storage/technicians/' . $image);
    }

    public function getSpecialistsStringAttribute($specialists)
    {
        if ($specialists === null || $specialists->isEmpty()) {
            return 'No specialists';
        }

        $specialistsString = $specialists->pluck('name')->implode(', ');

        if ($specialists->count() > 3) {
            $specialistsString .= ' +more';
        }

        return $specialistsString;
    }

    public function getInitialNameAttribute($name)
    {
        $initial = '';

        // Split the name by space and get the first character of each part
        $nameParts = explode(' ', $name);
        foreach ($nameParts as $part) {
            $initial .= strtoupper(substr($part, 0, 1));
        }

        return $initial;
    }


}
