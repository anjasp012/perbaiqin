<?php

namespace App\Http\Controllers\Technician\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->only('email', 'password');
        if (Auth::guard('technician')->attempt($credentials)) {
            return redirect()->route('technician.dashboard')->with('Success', 'Success login as technician');
        }
        flashMessage('Warning','Please check your credential', 'warning');

        return redirect()->back()->withInput($request->only('email'));
    }

    public function showLoginForm()
    {
        return inertia('technician/auth/login');
    }

    public function logout()
    {
        Auth::guard('technician')->logout();

        return redirect('/technician/login');
    }
}
