<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function edit()
    {
        $vendor = Auth::guard('vendor')->user();
        return inertia('vendor/profile/edit', [
            'vendor' => $vendor,
        ]);
    }

    public function update(Request $request)
    {
        $vendor = Auth::guard('vendor')->user();
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string   |min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $vendor->name = $request->name;
        $vendor->phone = $request->phone;
        $vendor->address = $request->address;

        // Update password if provided
        if ($request->password) {
            $vendor->password = Hash::make($request->password);
        }

        // Update image if provided
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($vendor->image) {
                Storage::delete($vendor->image);
            }
            // Store new image
            $vendor->image = $request->file('image')->store('vendor_images', 'public');
        }

        $vendor->save();

        return redirect()->route('vendor.dashboard')->with('success', 'Profile updated successfully.');
    }
}
