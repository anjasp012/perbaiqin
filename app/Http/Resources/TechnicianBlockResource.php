<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class TechnicianBlockResource extends JsonResource
{
    public function toArray($request)
    {
        // Ensure that the `specialists` relationship is loaded eagerly
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
