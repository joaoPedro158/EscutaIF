<?php

use App\Http\Controllers\AcolherController;
use App\Http\Controllers\admController;
use App\Http\Controllers\DenunciaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rotas para o controlador de administração
Route::post('/adm/registrar', [admController::class, 'criar']);
Route::post('/adm/login', [admController::class,'login']);

// Rotas para o controlador de acolhimento
Route::post('/acolher/form', [AcolherController::class, 'criar']);
Route::get('/acolher/listar', [AcolherController::class, 'listar'])->middleware('auth:sanctum');

// denuncia
Route::post('/denuncia/form', [DenunciaController::class, 'criar']);
Route::get('/denuncia/listar', [DenunciaController::class, 'listar'])->middleware('auth:sanctum');
