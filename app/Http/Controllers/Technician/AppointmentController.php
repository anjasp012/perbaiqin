<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    public function index()
    {
        $technician = Auth::guard('technician')->user();
        $appointments = Appointment::where('technician_id', $technician->id)
            ->with('user')
            ->when(request()->q, function ($query) {
                $query->whereHas('user', function ($subquery) {
                    $subquery->where('name', 'like', '%' . request()->q . '%');
                });
            })
            ->latest()
            ->paginate(10);
        $appointments->appends(['q' => request()->q]);
        return inertia('technician/appointments/index', [
            'appointments' => $appointments,
        ]);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = $request->status;
        $appointment->save();

        flashMessage('success', 'Appointment ' . $appointment->status . ' successfully.');
        return redirect()->route('technician.appointments.index');
    }
}
