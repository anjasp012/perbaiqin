<?php

use App\Http\Controllers\Landing\AppointmentController;
use App\Http\Controllers\Landing\AskTechnicianController;
use App\Http\Controllers\Landing\CollaborationController;
use App\Http\Controllers\Landing\ConsultationController;
use App\Http\Controllers\Landing\HomeController;
use App\Http\Controllers\Landing\ProductController;
use App\Http\Controllers\Landing\VideoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\AppointmentController as UserAppointmentController;
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
Route::get('/appointments/{slug}', [AppointmentController::class, 'show'])->name('landing.appointments.show');
Route::post('/appointments/make/{id}', [AppointmentController::class, 'makeAppointment'])->name('landing.appointments.make');

Route::get('/products', [ProductController::class, 'index'])->name('landing.products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('landing.products.show');

Route::get('/collaborations', [CollaborationController::class, 'index'])->name('landing.collaborations.index');
Route::get('/collaborations/{slug}', [CollaborationController::class, 'show'])->name('landing.collaborations.show');

Route::get('/videos', [VideoController::class, 'index'])->name('landing.videos.index');
Route::get('/videos/{id}', [VideoController::class, 'show'])->name('landing.videos.show');

// Route::middleware(['auth', 'vendor', 'admin', 'technician'])->group(function () {
Route::get('/consultation/{consultationId}/fetch-chat', [ConsultationController::class, 'fetch_chat'])->name('consultation.fetch_chat');
// });/
Route::post('consultation/send/{consulationId}', [ConsultationController::class, 'send'])->name('consultation.send');

require __DIR__ . '/auth.php';
require __DIR__ . '/user.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/technician.php';
require __DIR__ . '/vendor.php';
