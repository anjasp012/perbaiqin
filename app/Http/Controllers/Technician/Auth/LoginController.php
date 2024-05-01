<?php

namespace App\Http\Controllers\Technician\Auth;

use App\Http\Controllers\Controller;
use App\Models\Technician;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request): RedirectResponse
    {
        if (Technician::where('email', $request->email)->where('email_verified_at', null)->first() != null) {
            flashMessage('Warning', 'Email Not Verified', 'warning');
            return redirect()->back()->withInput($request->only('email'));
        };
        $credentials = $request->only('email', 'password');
        if (Auth::guard('technician')->attempt($credentials)) {
            return redirect()->route('technician.dashboard')->with('Success', 'Success login as technician');
        }
        flashMessage('Warning', 'Please check your credential', 'warning');

        return redirect()->back()->withInput($request->only('email'));
    }

    public function showLoginForm()
    {
        if (!Auth::guard('technician')->guest()) {
            return redirect('/technician/dashboard');
        }
        return inertia('technician/auth/login');
    }

    public function logout()
    {
        Auth::guard('technician')->logout();

        return redirect('/technician/login');
    }
}
