<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::with(['technician'])->when(request()->q, function ($videos) {
            $videos = $videos->where('captions', 'like', '%' . request()->q . '%');
        })->latest()->paginate(12);
        $videos->appends(['q' => request()->q]);

        return inertia('landing/videos/index', [
            'videos' => $videos,
        ]);
    }

    public function show($id)
    {
        $video = Video::with('technician')->findOrFail($id);
        $videos = Video::where('id', '!=', $id)->get();
        return inertia('landing/videos/show', [
            'video' => $video,
            'videos' => $videos,
        ]);
    }
}
