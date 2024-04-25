<?php

use App\Models\Consultation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('consultation.{consultationId}', function ($user, $consultationId) {
    $consultation = Consultation::findOrFail($consultationId);
    if ($user->id === $consultation->user_id || $user->id === $consultation->technician_id) {
        return true;
    }
    return false;
});
