<?php

namespace App\Http\Controllers\Api;

use App\Events\NewChatMessage;
use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\ConsultationMessage;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    public function index()
    {
        $userId = auth()->guard('api')->user()->id;
        $consultations = Consultation::with('technician')->latest()->where('user_id', $userId)->get();
        return response()->json([
            'success' => true,
            'data' => $consultations
        ], 200, [], JSON_PRETTY_PRINT);
    }

    public function create(Request $request)
    {
        $userId = auth()->guard('api')->user()->id;

        // Validasi request
        $request->validate([
            'technician_id' => 'required|exists:technicians,id',
            'price' => 'required|numeric',
            'status' => 'required|in:pending,ongoing,completed',
        ]);

        $existingConsultation = Consultation::where('user_id', $userId)->where('technician_id', $request->technician_id)
            ->whereIn('status', ['pending', 'ongoing'])
            ->first();

        if ($existingConsultation) {
            return response()->json([
                'success' => false,
                'message' => 'existing',
                'data' => $existingConsultation,
            ], 400);
        }

        $consultation = Consultation::with('technician')->create([
            'user_id' => $userId,
            'technician_id' => $request->technician_id,
            'price' => $request->price,
            'status' => $request->status,
        ]);

        // Berikan respons
        return response()->json([
            'success' => true,
            'message' => 'Consultation created successfully',
            'data' => $consultation
        ], 201,  [], JSON_PRETTY_PRINT);
    }

    public function chat($consultationId)
    {
        $consultation = Consultation::with('technician')->findOrFail($consultationId);
        $messages = $consultation->messages()->with('user', 'technician', 'product')->orderBy('created_at', 'asc')->get();
        return response()->json([
            'success' => true,
            'consultation' => $consultation,
            'messages' => $messages,
        ], 200, [], JSON_PRETTY_PRINT);
    }


    public function sendChatMessage(Request $request, $id)
    {
        try {
            // Validasi data yang dikirim dari formulir pesan
            $request->validate([
                'message' => 'required',
                'product_id' => 'nullable|exists:products,id', // Menambahkan validasi untuk product_id
                'image'     => 'nullable|image|mimes:jpeg,jpg,png, svg, gif,webp|max:2048',
            ]);
            
            $consultation = Consultation::with('technician', 'user')->findOrFail($id);
            $message = new ConsultationMessage();
            $message->consultation_id = $consultation->id;
            $message->user_id = $consultation->user->id;
            $message->technician_id = $consultation->technician->id;
            $message->message = $request->message;
            $technicianCheck = auth()->guard('technician')->check() ?? 0;
            if ($technicianCheck) {
                $message->sender_type = 'technician';
            } else {
                $message->sender_type = 'user';
            }
            //check if image is uploaded
            if ($request->hasFile('image')) {
                //upload new image
                $image = $request->file('image');
                $image->storeAs('messages', $image->hashName());
                $message->image  = $image->hashName() ?? null;
                $message->save();
            } else {
                $message->image  = NULL;
                $message->save();
            }
            // Jika product_id disertakan dalam request, tambahkan ke data pesan
            if (isset($request->product_id)) {
                [$message->product_id = $request->product_id];
            }
            event(new NewChatMessage(
                $message->id,
                $id,
                $request->message,
                $message->image,
                $message->sender_type,
                now()
            ));
            // Mengirim respons JSON yang berisi pesan yang baru dibuat
            return response()->json([
                'success' => true,
                'message' => $message,
            ], 200);
        } catch (\Exception $e) {
            // Tangani kesalahan
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    
}
