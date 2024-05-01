<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function edit()
    {
        $technician = Auth::guard('technician')->user();
        return inertia('technician/profile/edit', [
            'technician' => $technician,
        ]);
    }

    public function update(Request $request)
    {
        $technician = Auth::guard('technician')->user();
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'phone' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $technician->name = $request->name;
        $technician->phone = $request->phone;
        $technician->price = $request->price;

        // Update password if provided
        if ($request->password) {
            $technician->password = Hash::make($request->password);
        }

        // Update image if provided
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($technician->image) {
                Storage::delete($technician->image);
            }
            // Store new image
            $technician->image = $request->file('image')->store('technician_images', 'public');
        }

        $technician->save();

        return redirect()->route('technician.dashboard')->with('success', 'Profile updated successfully.');
    }
}
