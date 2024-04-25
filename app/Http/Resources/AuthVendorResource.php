<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthVendorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'initial' => Str::limit($this->name, 1, ''),
            'slug' => $this->slug,
            'email' => $this->email,
            'image' => $this->image,
            'address' => $this->address,
            'created_at' => $this->created_at ? $this->created_at->diffForHumans() : null,
        ];
    }
}
