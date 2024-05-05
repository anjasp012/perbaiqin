<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TCollaborationDetail extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function t_collaboration()
    {
        return $this->belongsTo(TCollaboration::class);
    }

    public function collaboration()
    {
        return $this->belongsTo(Collaboration::class);
    }
}
