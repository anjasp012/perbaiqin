<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\TechnicianCertificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function index()
    {
        $technician = Auth::guard('technician')->user();
        $certificates = TechnicianCertificate::where('technician_id', $technician->id)
            ->when(request()->q, function ($query) {
                $query->where('name', 'like', '%' . request()->q . '%');
            })
            ->latest()
            ->paginate(10);

        $certificates->appends(['q' => request()->q]);

        return inertia('technician/certificates/index', [
            'certificates' => $certificates,
        ]);
    }

    public function create()
    {
        return inertia('technician/certificates/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'certificate' => 'required|file|mimes:pdf|max:2048', // assuming certificate is a file (PDF) with max size 2048KB
        ]);

        $technician = Auth::guard('technician')->user();
        $certificate = new TechnicianCertificate();
        $certificate->technician_id = $technician->id;
        $certificate->name = $request->name;

        // Upload the certificate file
        $certificateFile = $request->file('certificate');
        $certificate->certificate = $certificateFile->store('certificates', 'public');
        $certificate->save();
        return redirect()->route('technician.certificates.index')->with('success', 'Certificate created successfully.');
    }

    public function edit(TechnicianCertificate $certificate)
    {
        $technician = Auth::guard('technician')->user();
        if ($certificate->technician_id !== $technician->id) {
            abort(403); // Tampilkan halaman larangan akses jika bukan pemilik sertifikat
        }
        return inertia('technician/certificates/edit', [
            'certificate' => $certificate,
        ]);
    }

    public function update(Request $request, TechnicianCertificate $certificate)
    {
        $request->validate([
            'name' => 'required',
            'certificate' => 'nullable|file|mimes:pdf|max:2048', // assuming certificate is a file (PDF) with max size 2048KB
        ]);

        $technician = Auth::guard('technician')->user();

        // Periksa apakah pengguna saat ini adalah pemilik sertifikat
        if ($certificate->technician_id !== $technician->id) {
            abort(403); // Tampilkan halaman larangan akses jika bukan pemilik sertifikat
        }

        $certificate->name = $request->name;

        // Update the certificate file if provided
        if ($request->hasFile('certificate')) {
            // Hapus sertifikat lama
            Storage::disk('public')->delete($certificate->certificate);

            // Upload sertifikat baru
            $certificateFile = $request->file('certificate');
            $certificate->certificate = $certificateFile->store('certificates', 'public');
        }

        $certificate->save();
        flashMessage('success', 'Certificate updated successfully.');
        return redirect()->route('technician.certificates.index');
    }

    public function destroy(TechnicianCertificate $certificate)
    {
        $technician = Auth::guard('technician')->user();

        // Periksa apakah pengguna saat ini adalah pemilik sertifikat
        if ($certificate->technician_id !== $technician->id) {
            abort(403); // Tampilkan halaman larangan akses jika bukan pemilik sertifikat
        }
        
        // Hapus sertifikat dari penyimpanan
        Storage::disk('public')->delete($certificate->certificate);

        // Hapus sertifikat dari basis data
        $certificate->delete();
        flashMessage('success', 'Certificate deleted successfully.');
        return redirect()->route('technician.certificates.index');
    }
}
