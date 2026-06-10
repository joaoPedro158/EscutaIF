<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Throwable;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{

    protected UserService $userService;

     public function __construct(UserService $userService)
    {
        $this->userService = $userService;

    }
    public function criar(Request $request) : JsonResponse {
            $dados = $request->all();
            $usuario = $this->userService->criar($dados);

            return response()->json([
                'message' => 'Usuário criado com sucesso',
                'usuario' => $usuario
            ], 201);
    }

    public function login(Request $request) : JsonResponse {

            $dados = $request->all();
            $usuario = $this->userService->login($dados);

            if (!$usuario) {
                return response()->json([
                    'message' => 'Email ou senha incorretos'
                ], 401);
            }

            $token = $usuario->createToken('dispositivo')->plainTextToken;

            return response()->json([
                'message' => 'Login realizado com sucesso',
                'token' => $token,
                'usuario' => $usuario
            ], 200);
    }
}
