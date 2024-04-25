<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductBlockResource extends JsonResource
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
            'title' => $this->title,
            'href' => route('products.show', $this->slug),
            'thumbnail' => $this->getPicture(),
            'created_at' => $this->created_at?->diffForHumans(),
            'category' => [
                'name' => $this->category->name,
                'href' => route('categories.show', $this->category->slug),
            ],
            // 'user' => [
            //     // 'picture' => $this->gravatar(50),
            //     'name' => $this->user->name,
            //     'href' => '#',
            //     // 'role' => 'Software Engineer',
            // ],
        ];
    }
}
