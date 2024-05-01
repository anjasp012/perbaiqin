<?php

namespace App\Http\Controllers\Technician\Auth;

use App\Http\Controllers\Controller;
use App\Models\Technician;
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
        ]);

        $slug = Str::slug($request->name, '-');
        $technician = Technician::create([
            'name' => $request->name,

            'slug' => $slug,
            'email' => $request->email,
            'phone' => $request->phone,
            'price' => $request->price,
            'password' => Hash::make($request->password),
        ]);

        flashMessage('Success', 'Register as technician successfully', 'success');
        return redirect()->route('technician.login');
    }
}
