<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject; // <-- import JWTSubject

class User extends Authenticatable implements JWTSubject

{
    use HasApiTokens, HasFactory, Notifiable;
    protected $guard_name ='api';

    /**
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

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

    public function gravatar($size = 150): string
    {
        return 'https://www.gravatar.com/avatar/' . md5(strtolower(trim($this->email))) . '?s=' . $size . '&d=mp';
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


    
    public function getPermissionArray()
    {
        return $this->getAllPermissions()->mapWithKeys(function($pr){
            return [$pr['name'] => true];
        });
   
    }

    /**
     * getJWTIdentifier
     *
     * @return void
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
        
    /**
     * getJWTCustomClaims
     *
     * @return void
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
