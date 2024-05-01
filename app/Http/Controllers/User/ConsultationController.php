<?php

namespace App\Http\Controllers\User;

use App\Events\MessageRead;
use App\Events\NewChatMessage;
use App\Events\NewChatMessageNoImage;
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
        $consultation = Consultation::with('technician.specialists')->findOrFail($consultationId);
        $paidPayment = ConsultationPayment::where('consultation_id', $consultationId)
            ->where('status', 'paid')
            ->exists();
        if ($paidPayment) {
            return redirect()->route('user.consultation.chat', $consultationId);
        }
        return inertia('user/consultation/index', [
            'consultation' => $consultation
        ]);
    }


    public function createConsultation($slug)
    {
        $technician = Technician::where('slug', $slug)->firstOrFail();
        $unfinishedConsultation = Consultation::where('technician_id', $technician->id)
            ->where('user_id', Auth::id())
            ->where('status', '!=', 'completed')
            ->first();
        if ($unfinishedConsultation) {
            flashMessage('Consultation', 'Consultation with ' . $technician->name . ' not finished. Please finish the ongoing consultation.', 'warning');
            return redirect()->route('user.consultation.index', $unfinishedConsultation->id);
        }

        // Buat konsultasi baru
        $consultation = new Consultation([
            'technician_id' => $technician->id,
            'user_id' => auth()->user()->id,
            'status' => 'pending',
            'price' => $technician->price,
        ]);
        $consultation->save();
        flashMessage('Consultation', 'Consultation created. Please finish the administration.', 'success');
        return redirect()->route('user.consultation.index', ['consultationId' => $consultation->id]);
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
        flashMessage('Payment', 'Payment successfully completed.', 'success');
        return redirect()->route('user.consultation.chat', $consultationId);
    }

    public function chat($consultationId)
    {
        $consultation = Consultation::with('messages.user', 'technician')->findOrFail($consultationId);
        $user = Auth::user();
        if ($user->id !== $consultation->user_id) {
            abort(403, 'Unauthorized');
        }
        // Ambil semua pesan konsultasi terkait
        // dd($messages);
        return inertia('user/consultation/chat', [
            'consultation' => $consultation,
        ]);
    }

    public function fetch_chat($consultationId)
    {
        // Temukan konsultasi yang sesuai berdasarkan ID
        $consultation = Consultation::with('technician')->findOrFail($consultationId);
        // Ambil semua pesan konsultasi terkait dengan pagination
        $messages = $consultation->messages()->with('user', 'technician', 'product')->orderBy('created_at', 'asc')->get();

        return response()->json([
            'success' => true,
            'consultation' => $consultation,
            'messages' => $messages,
        ], 200, [], JSON_PRETTY_PRINT); // Menambahkan opsi JSON_PRETTY_PRINT
    }


    public function markAsRead($id)
    {
        $message = ConsultationMessage::findOrFail($id);
        $message->read_at = now();
        $message->save();

        event(new MessageRead($message));


        return response()->json(
            [
                'success' => true,
                'message' => 'Message marked as read'
            ],
            200
        );
    }

    public function send(Request $request, $consultationId)
    {
        // Validasi data yang dikirim dari formulir pesan
        $request->validate([
            'message' => 'required',
            'product_id' => 'nullable|exists:products,id', // Menambahkan validasi untuk product_id
            'image'     => 'image|mimes:jpeg,jpg,png, svg, gif,webp|max:2048',
        ]);
        $consultation = Consultation::with('technician', 'user')->findOrFail($consultationId);
        // Temukan konsultasi yang sesuai berdasarkan ID
        $message = new ConsultationMessage();
        $message->consultation_id = $consultation->id;
        $message->user_id = $consultation->user->id;
        $message->technician_id = $consultation->technician->id;
        $message->message = $request->message;
        $message->sender_type = 'user';
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

        // Mengirim respons JSON yang berisi pesan yang baru dibuat
        return response()->json([
            'success' => true,
            'message' => $message,
        ], 200);
    }
}
