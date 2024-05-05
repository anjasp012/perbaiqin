<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VendorController extends Controller
{
    public function index()
    {
        $vendors = Vendor::when(request()->q, function ($vendors) {
            $vendors = $vendors->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);
        //append query string to pagination links
        $vendors->appends(['q' => request()->q]);
        return inertia(
            'admin/vendors/index',
            [
                'vendors' => $vendors,
            ]
        );
    }

    public function create()
    {
        return inertia('admin/vendors/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:specialists',
            'email' => 'required|email',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'phone' => 'required|numeric|min:10',
            'address' => 'required',
            'password' => 'required|confirmed',
        ]);

        $image = $request->file('image');
        $image->storeAs('vendors', $image->hashName());

        Vendor::create([
            'name' => $request->name,
            'image' => $image->hashName(),
            'address' => $request->address,
            'phone' => $request->phone,
            'password' => bcrypt($request->password)
        ]);

        flashMessage('success', 'Vendors created successfully', 'success');
        return redirect()->route('admin.vendors.index');
    }


    public function show($id)
    {
        $vendor = Vendor::where('id', $id)->firstOrFail();
        // dd($vendor);
        return inertia(
            'admin/vendors/show',
            [
                'vendor' => $vendor,
            ]
        );
    }
    public function edit($id)
    {
        $vendor = Vendor::where('id', $id)->firstOrFail();
        return inertia(
            'admin/vendors/edit',
            [
                'vendor' => $vendor,
            ]
        );
    }


    public function update(Request $request, Vendor $vendor)
    {
        $request->validate([
            'name' => 'required|unique:specialists,name,' . $vendor->id,
            'email' => 'required|email',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'phone' => 'required|numeric|min:10',
            'address' => 'required',
            'password' => 'nullable|confirmed', // Make password field nullable
        ]);

        // If the password is provided, hash it before updating
        if ($request->password) {
            $request->merge(['password' => Hash::make($request->password)]);
        } else {
            // If password is not provided, remove it from the request
            $request->request->remove('password');
        }

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            if ($vendor->image) {
                Storage::disk('local')->delete('vendors/' . basename($vendor->image));
            }
            $image = $request->file('image');
            $image->storeAs('vendors', $image->hashName());
            $vendor->update(['image' => $image->hashName()]);
        }

        // Update vendor details
        $vendor->update([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone' => $request->phone,
            'password' => $request->password ?? $vendor->password, // Use existing password if not updated
        ]);

        flashMessage('success', 'Vendors updated successfully', 'success');
        return redirect()->route('admin.vendors.index');
    }

    function destroy($id)
    {
        $vendor = Vendor::where('id', $id)->firstOrFail();

        if ($vendor->image) {
            Storage::disk('local')->delete('vendors/' . basename($vendor->image));
        }

        $vendor->delete();
        flashMessage('Deleted', 'Vendor deleted successfully.');
    }
}
