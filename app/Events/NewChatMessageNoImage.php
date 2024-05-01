<?php

namespace App\Events;

use Carbon\Carbon;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewChatMessageNoImage implements ShouldBroadcast
{

    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $consultation_id;
    public $message;
    public $sender;
    public $created_at;

    /**
     * Create a new event instance.
     *
     * @param $message
     */
    public function __construct($consultation_id, $message, $sender, $created_at)
    {
        $this->consultation_id = $consultation_id;
        $this->message = $message;
        $this->sender = $sender;
        $this->created_at = $created_at;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('consultation.' . $this->consultation_id);
    }

    public function broadcastAs()
    {
        return 'consultation-send';
    }

    public function broadcastWith()
    {

        $now = Carbon::now();
        $created_at = Carbon::parse($this->created_at);
        // Periksa apakah pesan dikirim dalam beberapa detik terakhir
        if ($now->diffInRealMinutes($created_at) < 5) {
            $timeAgo = $created_at->diffForHumans($now);
        } else {
            // Jika lebih dari beberapa detik, tampilkan dalam format yang diinginkan
            $timeAgo = $created_at->isoFormat('dddd, D MMM YYYY, HH:mm');
        }
        $data = [
            'consultation_id' => $this->consultation_id,
            'message' => $this->message,
            'sender' => $this->sender,
            'created_at' => $timeAgo
        ];

        return $data;
    }
}
