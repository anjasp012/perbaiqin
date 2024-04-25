<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\ConsultationMessage;
use App\Models\ConsultationPayment;
use App\Models\Technician;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsultationController extends Controller
{
    public function index($consultationId)
    {
        $consultation = Consultation::with('technician')->findOrFail($consultationId);
        return response()->json(['consultation' => $consultation]);
    }

    public function createConsultation($slug)
    {
        $technician = Technician::where('slug', $slug)->firstOrFail();
        $unfinishedConsultation = Consultation::where('technician_id', $technician->id)
            ->where('status', '!=', 'completed')
            ->first();

        if ($unfinishedConsultation) {
            return response()->json(['message' => 'Consultation with ' . $technician->name . ' not finished. Please finish the ongoing consultation.'], 400);
        }

        // Buat konsultasi baru
        $consultation = new Consultation([
            'technician_id' => $technician->id,
            'user_id' => auth()->user()->id,
            'status' => 'ongoing',
            'price' => $technician->price,
        ]);
        $consultation->save();
        
        return response()->json(['message' => 'Consultation created.', 'consultation' => $consultation], 200);
    }

    public function confirmationPayment($consultationId)
    {
        $consultation = Consultation::findOrFail($consultationId);
        
        $payment = new ConsultationPayment([
            'consultation_id' => $consultation->id,
            'invoice' => uniqid(),
            'amount' => $consultation->price,
            'status' => 'paid',
        ]);
        $consultation->status = 'ongoing';
        $payment->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Payment successfully completed.'], 200);
    }

    public function chat($consultationId)
    {
        $consultation = Consultation::with('messages.user', 'technician')->findOrFail($consultationId);
        $user = Auth::user();
        $technician = auth()->guard('technician')->user() ?? $user;
        
        return response()->json([
            'success' => true,
            'consultation' => $consultation], 200);
    }

    public function fetchChat($consultationId)
    {
        $consultation = Consultation::with('technician')->findOrFail($consultationId);
        $messages = $consultation->messages()->with('user', 'technician', 'product')->orderBy('created_at', 'asc')->get();
        
        return response()->json(['consultation' => $consultation, 'messages' => $messages], 200);
    }

    public function send(Request $request, $consultationId)
    {
        $request->validate([
            'message' => 'required',
            'product_id' => 'nullable|exists:products,id',
            'image' => 'image|mimes:jpeg,jpg,png,svg,gif,webp|max:2048',
        ]);
        
        $consultation = Consultation::findOrFail($consultationId);
        $message = new ConsultationMessage();
        $message->consultation_id = $consultation->id;
        $message->user_id = $consultation->user->id;
        $message->technician_id = $consultation->technician->id;
        $message->message = $request->message;
        $message->sender_type = 'user';
        // }
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->storeAs('messages', $image->hashName());
            $message->image = $image->hashName();
        }
        
        $message->save();
        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully.', 'message' => $message], 200);
    }
}
