<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Consultation;
use App\Models\Technician;
use App\Models\TechnicianReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Const_;

class TechnicianReviewController extends Controller
{
    public function store(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $technicianReview = new TechnicianReview();
        $technicianReview->user_id = Auth::id();
        $technicianReview->technician_id = $appointment->technician_id;
        $technicianReview->rate = $request->rate;
        $technicianReview->review = $request->review;
        $technicianReview->save();

        $appointment->update([
            'reviewed' => true
        ]);

        flashMessage('success', 'Rate & Review created successfully.');
        return redirect()->route('user.appointments.show', $id);
    }
}
