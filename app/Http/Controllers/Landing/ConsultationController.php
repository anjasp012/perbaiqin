<?php

namespace App\Http\Controllers\Landing;

use App\Events\MessageRead;
use App\Events\NewChatMessage;
use App\Events\NewChatMessageNoImage;
use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\ConsultationMessage;
use App\Models\ConsultationPayment;
use App\Models\Technician;
use Illuminate\Http\Request;
use Illuminate\Notifications\Channels\BroadcastChannel;
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
            return redirect()->route('consultation.chat', $consultationId);
        }
        return inertia('consultation/index', [
            'consultation' => $consultation
        ]);
    }

    public function createConsultation($slug)
    {
        $technician = Technician::where('slug', $slug)->firstOrFail();
        $unfinishedConsultation = Consultation::where('technician_id', $technician->id)
            ->where('status', '!=', 'completed')
            ->first();

        if ($unfinishedConsultation) {
            flashMessage('Consultation', 'Consultation with ' . $technician->name . ' not finished. Please finish the ongoing consultation.', 'warning');
            return redirect()->route('consultation.index', $unfinishedConsultation->id);
        }

        // Buat konsultasi baru
        $consultation = new Consultation([
            'technician_id' => $technician->id,
            'user_id' => auth()->user()->id,
            'status' => 'ongoing',
            'price' => $technician->price,
        ]);
        $consultation->save();
        flashMessage('Consultation', 'Consultation created. Please finish the administration.', 'success');
        return redirect()->route('consultation.index', ['consultationId' => $consultation->id]);
    }

    public function confirmationPayment($consultationId)
    {
        // Temukan konsultasi yang dimaksud
        $consultation = Consultation::findOrFail($consultationId);
        // Buat entri baru di tabel consultation_payments
        $payment = new ConsultationPayment([
            'consultation_id' => $consultation->id,
            'invoice' => uniqid(),
            'amount' => $consultation->price,
            'status' => 'paid',
        ]);
        $consultation->status = 'ongoing';
        $payment->save();
        flashMessage('Payment', 'Payment successfully completed.', 'success');
        return redirect()->route('consultation.chat', $consultationId);
    }

    public function chat($consultationId)
    {
        $consultation = Consultation::with('messages.user', 'technician')->findOrFail($consultationId);
        $user = Auth::user();
        $technician = auth()->guard('technician')->user() ?? $user;

        return inertia('consultation/chat', [
            'consultation' => $consultation,
        ]);
    }

    public function fetch_chat($consultationId)
    {
        $consultation = Consultation::with('technician')->findOrFail($consultationId);
        $messages = $consultation->messages()->with('user', 'technician', 'product')->orderBy('created_at', 'asc')->get();
        return response()->json([
            'success' => true,
            'consultation' => $consultation,
            'messages' => $messages,
        ], 200, [], JSON_PRETTY_PRINT); // Menambahkan opsi JSON_PRETTY_PRINT
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
            $consultationId,
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
    }
}
