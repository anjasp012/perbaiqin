<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TechnicianBlockResource;
use App\Models\Specialist;
use Illuminate\Http\Request;
use App\Models\Technician;
use App\Models\TechnicianSpecialist;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TechnicianController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $technicians = Technician::with('specialists')->when(request()->q, function ($technicians) {
            $technicians = $technicians->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);
        return inertia('admin/technicians/index', [
            'technicians' => $technicians,
        ]);
    }

    public function create()
    {
        return inertia('admin/technicians/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:technicians',
            'password' => 'required|min:6', // menambahkan validasi untuk password
            'email_verified_at' => 'nullable|date', // menambahkan validasi untuk email_verified_at
            'phone' => 'nullable|numeric',
            'price' => 'nullable|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);


        $slug = Str::slug($request->name, '-');
        $image = $request->file('image');
        $image->storeAs('technicians', $image->hashName());

        Technician::create([
            'name' => $request->name,
            'slug' => $slug,
            'email' => $request->email,
            'email_verified_at' => $request->email_verified_at,
            'phone' => $request->phone,
            'price' => $request->price,
            'password' => Hash::make($request->password),
            'image' => $image->hashName(),
        ]);

        flashMessage('Success', 'Technician created successfully', 'success');
        return redirect()->route('admin.technicians.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $technician = Technician::where('slug', $slug)->with('specialists')->firstOrFail();
        // dd($technician);
        $specialists = Specialist::all();

        return inertia(
            'admin/technicians/show',
            [
                'technician' => $technician,
                'specialists' => $specialists,
            ]
        );
    }


    public function manageSpecialist(Request $request, string $slug)
    {
        try {
            $technician = Technician::where('slug', $slug)->firstOrFail();

            // Ambil daftar specialist_id dari request
            $selectedSpecialists = $request->input('specialist_ids', []);
            // Sinkronisasi spesialisasi teknisi dengan spesialisasi yang dipilih oleh pengguna
            $technician->specialists()->sync($selectedSpecialists);
            // Berikan pesan sukses
            $message = 'Specialists updated successfully.';
            flashMessage('Success', $message);

            // Redirect kembali ke halaman sebelumnya
            return redirect()->back();
        } catch (QueryException $e) {
            // Tangani kesalahan database
            flashMessage('Error', 'Database error occurred: ' . $e->getMessage(), 'error');
            return redirect()->back();
        } catch (\Exception $e) {
            // Tangani kesalahan umum
            flashMessage('Error', 'An error occurred: ' . $e->getMessage(), 'error');
            return redirect()->back();
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $slug)
    {
        $technician = Technician::where('slug', $slug)->firstOrFail();
        return inertia('admin/technicians/edit', compact('technician'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:technicians,email,' . $slug . ',slug',
            'password' => 'nullable|min:6', // tambahkan validasi untuk password
            'email_verified_at' => 'nullable|date', // tambahkan validasi untuk email_verified_at
            'phone' => 'nullable|numeric',
            'price' => 'nullable|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $technician = Technician::where('slug', $slug)->firstOrFail();

        $technician->name = $request->name;
        $technician->email = $request->email;
        $technician->phone = $request->phone;
        $technician->price = $request->price;

        // Cek apakah ada perubahan password
        if ($request->filled('password')) {
            $technician->password = Hash::make($request->password);
        }

        // Cek apakah ada perubahan tanggal verifikasi email
        if ($request->filled('email_verified_at')) {
            $technician->email_verified_at = now(); // Atau atur tanggal yang sesuai dengan input pengguna
        }

        if ($request->hasFile('image')) {
            // Delete previous image if exists
            $image = $request->file('image');
            $image->storeAs('technicians', $image->hashName());

            // Delete old image
            if ($technician->image) {
                Storage::disk('local')->delete('technicians/' . basename($technician->image));
            }
            $technician->image = $image->hashName();
        }

        $technician->save();

        flashMessage('Updated', 'Technician updated successfully', 'success');
        return redirect()->route('admin.technicians.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        // dd($slug);
        $technician = Technician::where('slug', $slug)->firstOrFail();

        if ($technician->image) {
            Storage::disk('local')->delete('technicians/' . basename($technician->image));
        }

        $technician->delete();
        flashMessage('Deleted', 'Technician deleted successfully.');
        return redirect()->route('admin.technicians.index');
    }
}
