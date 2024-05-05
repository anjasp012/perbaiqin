<?php

use App\Http\Controllers\User\AppointmentController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\User\CollaborationOrderController;
use App\Http\Controllers\User\ConsultationController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\ProductReviewController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\TransactionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
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

        Route::get('cart', [CartController::class, 'index'])->name('cart.index');
        Route::post('cart/{id}', [CartController::class, 'post'])->name('cart.post');
        Route::delete('cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

        Route::get('checkout', [CheckoutController::class, 'index'])->name('checkout.index');
        Route::post('checkout/now', [CheckoutController::class, 'checkoutNow'])->name('checkout.checkoutNow');
        Route::post('checkout-collaboration/{id}', [CheckoutController::class, 'checkoutCollaboration'])->name('checkout.checkoutCollaboration');
        Route::post('checkout-collaboration-now/{id}', [CheckoutController::class, 'checkoutCollaborationNow'])->name('checkout.checkoutCollaborationNow');

        Route::get('appointments', [AppointmentController::class, 'index'])->name('appointments.index');
        Route::get('appointments/details/{no_transaction}', [AppointmentController::class, 'show'])->name('appointments.show');

        Route::get('collaboration-orders', [CollaborationOrderController::class, 'index'])->name('collaborationOrders.index');
        Route::get('collaboration-orders/details/{no_transaction_collaboration}', [CollaborationOrderController::class, 'show'])->name('collaborationOrders.show');
        Route::patch('collaboration-orders/{no_transaction_collaboration}', [CollaborationOrderController::class, 'update'])->name('collaborationOrders.update');

        Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');
        Route::get('transactions/details/{no_transaction}', [TransactionController::class, 'show'])->name('transactions.show');
        Route::post('transactions/{no_transaction}', [TransactionController::class, 'update'])->name('transactions.update');

        Route::post('transaction/product-review/{id}/{slug}', [ProductReviewController::class, 'store'])->name('productreview.store');
    });
});
