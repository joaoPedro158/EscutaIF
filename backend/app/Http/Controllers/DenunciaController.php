<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DenunciaService;
use Illuminate\Http\JsonResponse;

class DenunciaController extends Controller
{
    protected DenunciaService $denunciaService;

     public function __construct(DenunciaService $denunciaService)
    {
        $this->denunciaService = $denunciaService;

    }
    public function criar(Request $request) : JsonResponse
    {
        $dadosRequisição = $request->all();
        $denuncia = $this->denunciaService->registra($dadosRequisição);

        return response()->json($denuncia, 201);
    }
}
