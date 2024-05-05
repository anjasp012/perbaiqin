<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Collaboration;
use Illuminate\Http\Request;

class CollaborationController extends Controller
{
    public function show($slug)
    {
        $collaboration = Collaboration::with(['technician'])->where('slug', $slug)->firstOrFail();
        $collaborations = Collaboration::with('technician')->where('id', '!=', $collaboration->id)->take(4)->get();
        return inertia('landing/collaborations/show', [
            'collaboration' => $collaboration,
            'collaborations' => $collaborations,
        ]);
    }
}
