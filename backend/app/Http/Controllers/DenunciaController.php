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
        $dadosRequisicao = $request->all();
        $denuncia = $this->denunciaService->registra($dadosRequisicao);

        return response()->json($denuncia, 201);
    }

    public function listar() : JsonResponse
    {
        $denuncias = $this->denunciaService->listar();

        return response()->json($denuncias);
    }
}
