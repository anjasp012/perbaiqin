<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TCollaboration extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }


    public function t_collaboration_details()
    {
        return $this->hasMany(TCollaborationDetail::class);
    }
}
