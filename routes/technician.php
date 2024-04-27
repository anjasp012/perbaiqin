<?php

use App\Http\Controllers\Technician\AppointmentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Technician\Auth\LoginController;
use App\Http\Controllers\Technician\Auth\RegisterController;
use App\Http\Controllers\Technician\CartController;
use App\Http\Controllers\Technician\CertificateController;
use App\Http\Controllers\Technician\CheckoutController;
use App\Http\Controllers\Technician\ConsultationController;
use App\Http\Controllers\Technician\DashboardController;
use App\Http\Controllers\Technician\ProfileController;
use App\Http\Controllers\Technician\TransactionController;
use App\Http\Controllers\Technician\VideoController;

Route::group(['prefix' => 'technician', 'namespace' => 'Technician', 'as' => 'technician.'], function () {
    Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('login', [LoginController::class, 'authenticate'])->name('login');
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('register', [RegisterController::class, 'index'])->name('register');
    Route::post('register', [RegisterController::class, 'store'])->name('register.store');


    Route::middleware('technician')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('consultations', [ConsultationController::class, 'index'])->name('consultations.index');
        Route::get('consultations/show/{consulationId}', [ConsultationController::class, 'show'])->name('consultations.show');
        Route::get('consultations/chat/{consulationId}', [ConsultationController::class, 'chat'])->name('consultations.chat');
        Route::get('consultations/fetch/{consultationId}', [ConsultationController::class, 'fetch'])->name('consultations.fetch');
        Route::post('consultations/send/{consultationId}', [ConsultationController::class, 'send'])->name('consultations.send');
        Route::get('appointments', [AppointmentController::class, 'index'])->name('appointments.index');

        Route::get('/certificates', [CertificateController::class, 'index'])->name('certificates.index');
        Route::get('/certificates/create', [CertificateController::class, 'create'])->name('certificates.create');
        Route::post('/certificates', [CertificateController::class, 'store'])->name('certificates.store');
        Route::get('/certificates/{certificate}/edit', [CertificateController::class, 'edit'])->name('certificates.edit');
        Route::put('/certificates/{certificate}', [CertificateController::class, 'update'])->name('certificates.update');
        Route::delete('/certificates/{certificate}', [CertificateController::class, 'destroy'])->name('certificates.destroy');

        Route::get('videos', [VideoController::class, 'index'])->name('videos.index');
        Route::get('/videos/create', [VideoController::class, 'create'])->name('videos.create');
        Route::post('/videos', [VideoController::class, 'store'])->name('videos.store');
        Route::get('/videos/{id}/edit', [VideoController::class, 'edit'])->name('videos.edit');
        Route::post('/videos/{id}', [VideoController::class, 'update'])->name('videos.update');
        Route::delete('/videos/{id}', [VideoController::class, 'destroy'])->name('videos.destroy');

        Route::get('profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('profile/update', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('cart', [CartController::class, 'index'])->name('cart.index');
        Route::post('cart/{id}', [CartController::class, 'post'])->name('cart.post');
        Route::delete('cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

        Route::get('checkout', [CheckoutController::class, 'index'])->name('checkout.index');
        Route::post('checkout/now', [CheckoutController::class, 'checkoutNow'])->name('checkout.checkoutNow');

        Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');
        Route::get('transactions/details/{no_transaction}', [TransactionController::class, 'show'])->name('transactions.show');
    });
});
