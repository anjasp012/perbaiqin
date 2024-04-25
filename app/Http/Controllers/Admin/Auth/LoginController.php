<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->only('email', 'password');
        if (Auth::guard('admin')->attempt($credentials)) {
            flashMessage('Login', 'Login berhasil', 'success');
            return redirect()->route('admin.dashboard');
        }
        flashMessage('Warning','Mohon cek kembali kredensial anda', 'warning');
        return redirect()->back()->withInput($request->only('email'));
    }

    public function showLoginForm()
    {
        return inertia('admin/auth/login');
    }

    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect('/admin/login');
    }
}
