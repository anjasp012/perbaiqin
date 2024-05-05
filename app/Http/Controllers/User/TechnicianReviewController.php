<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\Technician;
use App\Models\TechnicianReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Const_;

class TechnicianReviewController extends Controller
{
    public function create($id)
    {
        $technician = Technician::findOrFail($id);
        return inertia('user/technician/ratereview', [
            'technician' => $technician,
        ]);
    }

    public function store(Request $request, $id)
    {
        $consultation = Consultation::findOrFail($id);
        $technician = Technician::findOrFail($consultation->id);
        $technicianReview = new TechnicianReview();
        $technicianReview->consultation_id = $technician->id;
        $technicianReview->user_id = Auth::id();
        $technicianReview->technician_id = $technician->id;
        $technicianReview->rate = $request->rate;
        $technicianReview->review = $request->review;
        $technicianReview->save();

        flashMessage('success', 'Rate & Review created successfully.');
        return redirect()->route('user.appointment.show', $id);
    }
}
