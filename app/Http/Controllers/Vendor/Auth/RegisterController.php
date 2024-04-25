<?php

namespace App\Http\Controllers\Vendor\Auth;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{

    public function __construct()
    {
        if (!auth()->guard('vendor')->check()) {
            return redirect()->route('vendor.dashboard');
        }
    }

    public function index()
    {
        return inertia('vendor/auth/register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . Vendor::class,
            'password' => 'required|confirmed',
            'phone' => 'required|numeric|digits_between:10,13',
            'agree' => 'required',
        ]);
        
        $vendor = Vendor::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        auth()->guard('vendor')->login($vendor);
        flashMessage('Success', 'Register as vendor successfully', 'success');
        return redirect()->route('vendor.dashboard');
    }
}
