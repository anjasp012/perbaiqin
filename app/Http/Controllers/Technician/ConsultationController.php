<?php

namespace App\Http\Controllers\Technician;

use App\Events\NewChatMessage;
use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\ConsultationMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsultationController extends Controller
{
    public function index()
    {
        $technician = Auth::guard('technician')->user();
        $consultations = Consultation::where('technician_id', $technician->id)
            ->with('user')
            ->when(request()->q, function ($query) {
                $query->whereHas('user', function ($subquery) {
                    $subquery->where('name', 'like', '%' . request()->q . '%');
                });
            })
            ->latest()
            ->paginate(10);
        $consultations->appends(['q' => request()->q]);
        return inertia('technician/consultation/index', [
            'consultations' => $consultations,
        ]);
    }

    public function show($consultationId)
    {
        $consultation = Consultation::findOrFail($consultationId);
        return inertia('technician/consultation/show', [
            'consultation' => $consultation,
        ]);
    }

    public function chat($consultationId)
    {
        $consultation = Consultation::with('user', 'technician')->findOrFail($consultationId);
        return inertia('technician/consultation/chat', [
            'consultation' => $consultation,
        ]);
    }

    public function fetch($consultationId)
    {
        // Temukan konsultasi yang sesuai berdasarkan ID
        $consultation = Consultation::with('messages.user', 'technician')->findOrFail($consultationId);
        // Ambil semua pesan konsultasi terkait
        $messages = $consultation->messages()->with('user', 'technician', 'product')->orderBy('created_at', 'asc')->get();
        return response()->json([
            'success' => true,
            'consultation' => $consultation,
            'messages' => $messages,
        ], 200);
    }

    public function send(Request $request, $consultationId)
    {
        // Validasi data yang dikirim dari formulir pesan
        $request->validate([
            'message' => 'required',
            'product_id' => 'nullable|exists:products,id',
            'image'     => 'image|mimes:jpeg,jpg,png, svg, gif,webp|max:2048',
        ]);
        $consultation = Consultation::with('technician', 'user')->findOrFail($consultationId);
        $message = new ConsultationMessage();
        $message->consultation_id = $consultation->id;
        $message->user_id = $consultation->user->id;
        $message->technician_id = $consultation->technician->id;
        $message->message = $request->message;
        $message->sender_type = 'technician';
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
        broadcast(new NewChatMessage(
            $message->id,
            $consultationId,
            $request->message,
            $message->image,
            $message->sender_type,
            now()
        ))->toOthers();

        return response()->json([
            'success' => true,
            'message' => $message,
        ], 200);
    }


    public function completed($consultationId)
    {
        $consultation = Consultation::findOrFail($consultationId);
        $consultation->status = 'completed';
        $consultation->save();
        flashMessage('Success', 'Consultation marked as Completed');
        return redirect()->back();
    }

    public function startVideoCall(Request $request, $consultationId)
    {
        // Lakukan validasi dan persiapan yang diperlukan untuk memulai panggilan video
        $consultation = Consultation::findOrFail($consultationId);
        // Ambil informasi pengguna yang terlibat dalam konsultasi
        $technician = $consultation->technician;
        $user = $consultation->user;

        // Mulai panggilan video di sini menggunakan WebRTC
        // Anda perlu mengirim informasi yang diperlukan seperti ID pengguna, jenis perangkat (teknisi atau pengguna), dll.

        // Contoh:
        // broadcast(new startVideoCall($consultationId, $technician->id, $user->id));

        return response()->json([
            'success' => true,
            'message' => 'Video call started successfully',
        ], 200);
    }

    public function acceptVideoCall(Request $request, $consultationId)
    {
        // Lakukan validasi dan persiapan yang diperlukan untuk menerima panggilan video
        $consultation = Consultation::findOrFail($consultationId);
        // Misalnya, Anda dapat menentukan bahwa panggilan video diterima jika status konsultasi adalah 'ongoing'
        if ($consultation->status === 'ongoing') {
            // Lakukan tindakan yang diperlukan untuk menerima panggilan video,
            // broadcast(new AcceptVideoCall($consultationId));
            return response()->json([
                'success' => true,
                'message' => 'Video call accepted successfully',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Consultation is not in ongoing state',
            ], 400);
        }
    }

    public function endVideoCall(Request $request, $consultationId)
    {
        // Lakukan validasi dan persiapan yang diperlukan untuk mengakhiri panggilan video
        $consultation = Consultation::findOrFail($consultationId);
        // Misalnya, Anda dapat menentukan bahwa panggilan video dapat diakhiri jika status konsultasi adalah 'ongoing'
        if ($consultation->status === 'ongoing') {
            // Lakukan tindakan yang diperlukan untuk mengakhiri panggilan video,
            // seperti memberikan sinyal ke frontend bahwa panggilan video telah berakhir
            // broadcast(new EndVideoCall($consultationId));
            return response()->json([
                'success' => true,
                'message' => 'Video call ended successfully',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Consultation is not in ongoing state',
            ], 400);
        }
    }
}
