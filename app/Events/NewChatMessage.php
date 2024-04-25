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

class NewChatMessage implements ShouldBroadcast
{

    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $id;
    public $consultation_id;
    public $message;
    public $sender;
    public $image;
    public $created_at;

    /**
     * Create a new event instance.
     *
     * @param $message
     */
    public function __construct($id, $consultation_id, $message, $image, $sender, $created_at)
    {
        $this->id = $id;
        $this->consultation_id = $consultation_id;
        $this->message = $message;
        $this->sender = $sender;
        $this->image = $image;
        $this->created_at = $created_at;
    }

    public function broadcastOn()
    {
        return new Channel('consultation.' . $this->consultation_id);
    }

    public function broadcastAs()
    {
        return 'consultation-send';
    }

    public function broadcastWith()
    {
        
        $data = [
            'id' => $this->id,
            'consultation_id' => $this->consultation_id,
            'message' => $this->message,
            'sender' => $this->sender,
            'created_at' => $this->created_at
        ];

        // Periksa apakah ada gambar
        if ($this->image) {
            $data['image'] = $this->image;
        }

        return $data;
    }
}
