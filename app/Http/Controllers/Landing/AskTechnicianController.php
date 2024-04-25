<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Http\Resources\TechnicianBlockResource;
use App\Models\Consultation;
use App\Models\ConsultationPayment;
use App\Models\Specialist;
use App\Models\Technician;
use Illuminate\Http\Request;

class AskTechnicianController extends Controller
{

    public function index(Request $request)
    {
        $searchQuery = $request->input('search');

        // Query untuk teknisi dengan eager loading untuk spesialis
        $techniciansQuery = Technician::query()->with('specialists');

        if ($searchQuery) {
            // Filter berdasarkan nama teknisi atau spesialis
            $techniciansQuery->where(function ($query) use ($searchQuery) {
                $query->where('name', 'like', '%' . $searchQuery . '%')
                    ->orWhereHas('specialists', function ($query) use ($searchQuery) {
                        $query->where('name', 'like', '%' . $searchQuery . '%');
                    });
            });
        }

        // Ambil data teknisi dengan paginasi
        $technicians = $techniciansQuery->paginate(8);

        // Ambil data spesialis
        $specialists = Specialist::inRandomOrder()->take(4)->get();

        return inertia(
            'landing/ask/index',
            [
                'technicians' => TechnicianBlockResource::collection($technicians)->additional([
                    'meta' => [
                        'has_pages' => $technicians->hasPages(),
                    ],
                ]),
                'specialists' => $specialists
            ]
        );
    }

    public function speciality($slug)
    {
        $specialist = Specialist::with('technicians')->where('slug', $slug)->firstOrFail();
        $technicians = Technician::with('specialists')
        ->whereHas('specialists', function ($query) use ($specialist) {
            $query->where('slug', $specialist->slug);
        })
        ->when(request()->has('q'), function ($query) {
            $query->where('name', 'like', '%' . request()->q . '%');
        })
        ->latest()
        ->paginate(12)
        ->appends(['q' => request()->q]);
        return inertia('landing/ask/techspeciality', [
            'technicians' => $technicians,
            'specialist' => $specialist,
        ]);
    }
    
    public function specialists(){
        $specialists = Specialist::when(request()->q, function ($specialists) {
            $specialists = $specialists->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(12);
        $specialists->appends(['q' => request()->q]);
        return inertia('landing/ask/specialists', [
            'specialists' => $specialists,
        ]);
    }


    public function show($slug)
    {
        if (!auth()->guard('web')->check()) {
            flashMessage('Login', 'Please login before ask techcians', 'warning');
            return redirect()->route('login');
        }
        $technician = Technician::where('slug', $slug)->firstOrFail();
        $formattedTechnician = new TechnicianBlockResource($technician);

        return inertia(
            'landing/ask/show',
            [
                'technician' => $formattedTechnician
            ]
        );
    }



    // public function consultationPayment($consultationId)
    // {
    //     $consultation = Consultation::findOrFail($consultationId);
    //     return response()->json(['message' => 'Consultation payment processed successfully']);
    // }

    public function makePayment($consultationId)
    {
        $consultation = Consultation::findOrFail($consultationId);
        $payment = new ConsultationPayment([
            'consultation_id' => $consultation->id,
            'invoice' => uniqid(),
            'amount' => $consultation->price,
            'status' => 'unpaid',
        ]);
        $payment->save();
        return response()->json(['message' => 'Payment created successfully']);
    }
}
