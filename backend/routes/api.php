<?php

use App\Http\Controllers\AcolherController;
use App\Http\Controllers\admController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rotas para o controlador de administração
Route::post('/adm/registrar', [admController::class, 'criar']);
Route::post('/adm/login', [admController::class,'login']);

// Rotas para o controlador de acolhimento
Route::post('/acolher/from', [AcolherController::class, 'criar']);
Route::get('/acolher/listar', [AcolherController::class, 'listar']);
