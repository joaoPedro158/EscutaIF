<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\AcolherService;

class AcolherController extends Controller
{
    protected AcolherService $acolherService;

     public function __construct(AcolherService $acolherService)
    {
        $this->acolherService = $acolherService;

    }
    public function criar(Request $request) : JsonResponse
    {
        $acolhido = $this->acolherService->registra($request->all());



        return response()->json(['message' => 'Acolhido criado com sucesso!',
                                    'data' => $acolhido], 201);

    }
}
