<?php

namespace App\Http\Controllers\Technician;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Collaboration;
use App\Http\Controllers\Controller;

class CollaborationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collaborations = Collaboration::with('technician')->when(request()->q, function ($collaborations) {
            $collaborations = $collaborations->where('name', 'like', '%' . request()->q . '%');
        })
            ->where('technician_id', auth()->guard('technician')->user()->id)
            ->latest()
            ->paginate(10);
        $collaborations->appends(['q' => request()->q]);
        return inertia('technician/collaborations/index', [
            'collaborations' => $collaborations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('technician/collaborations/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        $imagePath = $request->file('image')->store('collaborations');
        $product = new Collaboration();
        $product->name = $request->name;
        $uniqueString = Str::random(5);
        $slug = Str::slug($request->name) . '-' . $uniqueString;
        $product->slug = $slug;
        $product->image = $imagePath;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->technician_id = auth()->guard('technician')->user()->id;
        $product->save();
        flashMessage('success', 'Collaboration created successfully.');
        return redirect()->route('technician.collaborations.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
