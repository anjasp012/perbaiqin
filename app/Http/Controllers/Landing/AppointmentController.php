<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Http\Resources\TechnicianBlockResource;
use App\Models\Appointment;
use App\Models\Technician;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $searchQuery = $request->input('search');
        $perPage = 10;
        $techniciansQuery = Technician::query()->with('specialists');
        if ($searchQuery) {
            $techniciansQuery->where(function ($query) use ($searchQuery) {
                $query->where('name', 'like', '%' . $searchQuery . '%')
                    ->orWhereHas('specialists', function ($query) use ($searchQuery) {
                        $query->where('name', 'like', '%' . $searchQuery . '%');
                    });
            });
        }
        $technicians = $techniciansQuery->paginate($perPage);
        return inertia('landing/appointments/index', [
            'technicians' => TechnicianBlockResource::collection($technicians),
            'meta' => [
                'has_pages' => $technicians->hasPages(),
            ]
        ]);
    }

    public function show($slug)
    {
        if (!auth()->guard('web')->check()) {
            flashMessage('Login', 'Please login before make appointments', 'warning');
            return redirect()->route('login');
        }
        $technician = Technician::where('slug', $slug)->firstOrFail();
        $formattedTechnician = new TechnicianBlockResource($technician);

        return inertia(
            'landing/appointments/show',
            [
                'technician' => $formattedTechnician
            ]
        );
    }

    public function makeAppointment(Request $request, $technicianId)
    {
        $userId = auth()->guard('web')->user()->id;

       $existingAppointment = Appointment::where('user_id', $userId)
        ->where('technician_id', $technicianId)
        ->where('status', ['pending', 'accepted'])
        ->first();

        if ($existingAppointment) {
            return response()->json([
                'success' => false,
                'message' => 'You already have an existing appointment with this technician.'], 400);
        }

        $technician = Technician::findOrFail($technicianId);
        $appointment = new Appointment([
            'user_id' => $userId,
            'technician_id' => $technician->id,
            'date' => $request->date,
            'time' => $request->time,
            'status' => 'pending',
        ]);
        $appointment->save();

        return response()->json([
            'success' => true,
            'message' => 'Appointment created successfully'
        ], 200);
    }

    public function cancelAppointment($appointmentId)
    {
        $userId = auth()->guard('web')->user()->id;

        $appointment = Appointment::where('id', $appointmentId)
            ->where('user_id', $userId)
            ->where('status', 'pending') // Pastikan status janji temu adalah 'pending'
            ->first();
        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found or status is not pending.'], 404);
        }

        // Ubah status janji temu menjadi dibatalkan
        $appointment->status = 'canceled';
        $appointment->save();

        return response()->json([
            'success' => true,
            'message' => 'Appointment canceled successfully']);
    }

}
