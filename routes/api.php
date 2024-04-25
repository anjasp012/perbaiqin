<?php

use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\TechnicianController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('technician/fetch', [TechnicianController::class, 'index']);
Route::get('technician/fetch_home', [TechnicianController::class, 'homepage']);
Route::get('consultation/fetch', [ConsultationController::class, 'index']);
Route::post('consultation/create', [ConsultationController::class, 'create']);

Route::post('consultation/chat/{id}/send', [ConsultationController::class, 'sendChatMessage']);
Route::get('consultation/chat/{id}', [ConsultationController::class, 'chat']);

Route::post('login', [LoginController::class, 'index']);
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', [LogoutController::class, 'logout']);
});
