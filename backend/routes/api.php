<?php

use App\Http\Controllers\admController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/adm/registrar', [admController::class, 'criar']);

