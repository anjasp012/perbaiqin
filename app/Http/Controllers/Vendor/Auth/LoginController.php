<?php

namespace App\Http\Controllers\Vendor\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->only('email', 'password');
        if (Auth::guard('vendor')->attempt($credentials)) {
            return redirect()->intended('/vendor/dashboard')->with('Success', 'Success login as vendor');
        }
        flashMessage('Warning','Please check your credentials again', 'warning');
        return redirect()->back()->withInput($request->only('email'));
    }

    public function showLoginForm()
    {
        return inertia('vendor/auth/login');
    }

    public function logout()
    {
        Auth::guard('vendor')->logout();
        return redirect()->route('vendor.login');
    }
}
