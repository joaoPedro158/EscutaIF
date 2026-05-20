<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class admController extends Controller
{
    public function criar(Request $request) {

       $usuario = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Administrador criado com sucesso',
            'usuario' => $usuario
        ], 201);
    }

    public function login(Request $request) {
        $usuario = User::where('email', $request->email)->first();

       if (!$usuario || !Hash::check($request->password, $usuario->password)) {
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
