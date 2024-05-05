<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Video;

class VideoController extends Controller
{
    public function index()
    {
        $technician = Auth::guard('technician')->user();
        $videos = Video::where('technician_id', $technician->id)->when(request()->q, function ($videos) {
            $videos = $videos->where('captions', 'like', '%' . request()->q . '%');
        })->latest()->paginate(12);
        $videos->appends(['q' => request()->q]);
        return inertia('technician/videos/index', ['videos' => $videos]);
    }

    public function create()
    {
        $tags = Tag::all();
        return inertia('technician/videos/create', ['tags' => $tags]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'captions' => 'required|string',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            // 'tags' => 'required|array',
            'file_video' => 'required|file|mimes:mp4,mov,avi,wmv|max:10240',
        ]);

        $imagePath = $request->file('thumbnail')->store('videos');
        $technician = Auth::guard('technician')->user();

        $video = new Video();
        $video->technician_id = $technician->id;
        $video->thumbnail = $imagePath;
        $video->captions = $request->captions;

        $videoFile = $request->file('file_video');
        $video->file_video = $videoFile->store('videos', 'public');

        $video->save();
        // $video->tags()->sync($request->tags);
        flashMessage('success', 'Video created successfully.');
        return redirect()->route('technician.videos.index');
    }

    public function edit($id)
    {
        $video = Video::findOrFail($id);
        return inertia('technician/videos/edit', ['video' => $video]);
    }

    public function update(Request $request, $id)
    {
        $video = Video::findOrFail($id);
        $request->validate([
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'captions' => 'required|string',
            // 'tags' => 'required|array',
            'file_video' => 'nullable|file|mimes:mp4,mov,avi,wmv|max:10240', // Max 200MB
        ]);

        $video->captions = $request->captions;
        // $video->tags = $request->tags;

        if ($request->hasFile('thumbnail')) {
            // Delete old video file
            Storage::disk('public')->delete($video->thumbnail);
            $newThumbnailFile = $request->file('thumbnail');
            $video->thumbnail = $newThumbnailFile->store('videos', 'public');
        }
        if ($request->hasFile('file_video')) {
            // Delete old video file
            Storage::disk('public')->delete($video->file_video);
            $newVideoFile = $request->file('file_video');
            $video->file_video = $newVideoFile->store('videos', 'public');
        }

        $video->save();
        // $video->tags()->sync($request->tags);
        flashMessage('success', 'Video updated successfully.');
        return redirect()->route('technician.videos.index');
    }

    public function destroy($id)
    {
        // Delete video file from storage
        $video = Video::findOrFail($id);
        Storage::disk('public')->delete($video->file_video);
        // $video->tags()->detach();
        // Delete video record from database
        $video->delete();
        flashMessage('success', 'Video deleted successfully.');
        return redirect()->route('technician.videos.index');
    }
}
