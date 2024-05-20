<?php

namespace App\Http\Controllers\Technician\Auth;

use App\Http\Controllers\Controller;
use App\Models\Technician;
use App\Models\TechnicianCertificate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Str;

class RegisterController extends Controller
{

    public function __construct()
    {
        if (!auth()->guard('technician')->check()) {
            return redirect()->route('technician.dashboard');
        }
    }

    public function index()
    {
        return inertia('technician/auth/register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . Technician::class,
            'password' => 'required|confirmed',
            'phone' => 'required|numeric|digits_between:10,13',
            'price' => 'required|numeric',
            'agree' => 'required',
            'city' => 'required',
            'country' => 'required',
            'address' => 'required',
            'ktp' => 'required',
            'ijazah' => 'required',
            'certificates' => 'required|array'
        ]);

        $slug = Str::slug($request->name, '-');
        $ktpPath = $request->file('ktp')->store('technicians/ktp');
        $ijazahPath = $request->file('ijazah')->store('technicians/ijazah');

        $technician = Technician::create([
            'name' => $request->name,
            'slug' => $slug,
            'email' => $request->email,
            'phone' => $request->phone,
            'price' => $request->price,
            'city' => $request->city,
            'country' => $request->country,
            'address' => $request->address,
            'ktp' => $ktpPath,
            'ijazah' => $ijazahPath,
            'password' => Hash::make($request->password),
        ]);

        foreach ($request->certificates as $certificateFile) {
            $certificate = new TechnicianCertificate();
            $certificate->technician_id = $technician->id;
            $certificate->name = pathinfo($certificateFile->getClientOriginalName(), PATHINFO_FILENAME);;
            $certificate->certificate = $certificateFile->store('certificates');
            $certificate->save();
        }

        flashMessage('Success', 'Register as technician successfully', 'success');
        return redirect()->route('technician.login');
    }
}
