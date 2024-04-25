<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Vendor\Auth\LoginController;
use App\Http\Controllers\Vendor\Auth\RegisterController;
use App\Http\Controllers\Vendor\DashboardController;
use App\Http\Controllers\Vendor\ProductController;
use App\Http\Controllers\Vendor\TransactionController;
use App\Http\Controllers\Vendor\ProfileController;

Route::group(['prefix' => 'vendor', 'namespace' => 'Vendor', 'as' => 'vendor.'], function () {

    Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('login', [LoginController::class, 'authenticate']);
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('register', [RegisterController::class, 'index'])->name('register');
    Route::post('register', [RegisterController::class, 'store'])->name('register.store');

    Route::middleware('vendor')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('products', [ProductController::class, 'index'])->name('products.index');
        Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('products', [ProductController::class, 'store'])->name('products.store');
        Route::get('products/{slug}', [ProductController::class, 'show'])->name('products.show');
        Route::get('products/{slug}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('products/{slug}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('products/{slug}', [ProductController::class, 'destroy'])->name('products.destroy');
        Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');
        Route::get('transactions/create', [TransactionController::class, 'create'])->name('transactions.create');
        Route::post('transactions', [TransactionController::class, 'store'])->name('transactions.store');
        Route::get('transactions/details/{no_transaction}', [TransactionController::class, 'show'])->name('transactions.show');
        Route::get('transactions/{id}/edit', [TransactionController::class, 'edit'])->name('transactions.edit');
        Route::post('transactions/{id}', [TransactionController::class, 'update'])->name('transactions.update');
        Route::delete('transactions/{id}', [TransactionController::class, 'destroy'])->name('transactions.destroy');
    });
});
