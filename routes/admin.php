<?php

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\SpecialistController;
use App\Http\Controllers\Admin\TechnicianController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VendorController;

Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    // Menampilkan form login
    Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
    // Proses otentikasi login
    Route::post('login', [LoginController::class, 'authenticate'])->name('authenticate');
    // Proses logout
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');

    // with middleware auth:admin
    Route::middleware('admin')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('specialists', SpecialistController::class);
        Route::post('technicians/specialists/{slug}', [TechnicianController::class, 'manageSpecialist'])->name('technicians.manage-specialists');
        Route::resource('technicians', TechnicianController::class);
        Route::get('technicians/verified/{slug}', [TechnicianController::class, 'verified'])->name('technicians.verified');
        Route::get('technicians/{slug}/certificates', [TechnicianController::class, 'certificates'])->name('technicians.certificates');
        Route::resource('users', UserController::class);
        Route::resource('admins', AdminController::class);
        Route::resource('products', ProductController::class);
        Route::resource('vendors', VendorController::class);

        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});
