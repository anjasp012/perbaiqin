<?php

use App\Http\Controllers\Landing\AppointmentController;
use App\Http\Controllers\Landing\AskTechnicianController;
use App\Http\Controllers\Landing\ConsultationController;
use App\Http\Controllers\Landing\HomeController;
use App\Http\Controllers\Landing\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Controllers\User\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/ask-technician', [AskTechnicianController::class, 'index'])->name('landing.ask-technician.index');
Route::get('/ask-technician/{slug}', [AskTechnicianController::class, 'show'])->name('landing.ask-technician.show');
Route::get('/ask-technician/specialists/{slug}', [AskTechnicianController::class, 'speciality'])->name('landing.technician.specialist.show');
Route::get('/specialists', [AskTechnicianController::class, 'specialists'])->name('landing.specialists.index');

Route::get('/appointments', [AppointmentController::class, 'index'])->name('landing.appointments.index');

Route::get('/products', [ProductController::class, 'index'])->name('landing.products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('landing.products.show');


Route::middleware('auth')->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('consultation/{consultationId}', [ConsultationController::class, 'index'])->name('consultation.index');
    Route::post('create-consultation/{slug}', [ConsultationController::class, 'createConsultation'])->name('consultation.create');
    Route::post('consultation/confirm/{consulationId}', [ConsultationController::class, 'confirmationPayment'])->name('consultation.confirmation');
    Route::get('consultation/chat/{consulationId}', [ConsultationController::class, 'chat'])->name('consultation.chat');
    Route::post('consultation/send/{consulationId}', [ConsultationController::class, 'send'])->name('consultation.send');


    Route::post('/consultation/message/{id}/read', [ConsultationController::class, 'markAsRead'])->name('consultation.message.mark_as_read');
    Route::get('/appointments/{slug}', [AppointmentController::class, 'show'])->name('landing.appointments.show');
    Route::post('/appointments/make/{id}', [AppointmentController::class, 'makeAppointment'])->name('landing.appointments.make');

    Route::get('cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('cart/{id}', [CartController::class, 'post'])->name('cart.post');
    Route::delete('cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('checkout/now', [CheckoutController::class, 'checkoutNow'])->name('checkout.checkoutNow');

    Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('transactions/details/{no_transaction}', [TransactionController::class, 'show'])->name('transactions.show');
});

// Route::middleware(['auth', 'vendor', 'admin', 'technician'])->group(function () {
Route::get('/consultation/{consultationId}/fetch-chat', [ConsultationController::class, 'fetch_chat'])->name('consultation.fetch_chat');
// });/
Route::post('consultation/send/{consulationId}', [ConsultationController::class, 'send'])->name('consultation.send');

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/technician.php';
require __DIR__ . '/vendor.php';
