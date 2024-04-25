<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthTechnicianResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->load('specialists');
        return [
            'id' => $this->id,
            'name' => $this->name,
            'initial' => Str::limit($this->name, 1, ''),
            'slug' => $this->slug,
            'email' => $this->email,
            'image' => $this->image,
            'price' => $this->price ?? 0,
            'created_at' => $this->created_at ? $this->created_at->diffForHumans() : null,
            'specialists' => $this->specialists->map(function ($specialist) {
                return [
                    'id' => $specialist->id,
                    'name' => $specialist->name,
                    'initial' => Str::limit($specialist->name, 1, ''),
                ];
            }),
        ];
    }
}
