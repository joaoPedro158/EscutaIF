<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserService
{
    public function criar(array $dados): User
    {
        $dadosValidos = Validator::make($dados, [
            'nome' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'password_confirmation' => 'required|same:password',
        ])->validate();


        $usuario = User::create([
            'nome' => $dadosValidos['nome'],
            'email' => $dadosValidos['email'],
            'password' => Hash::make($dadosValidos['password_confirmation']),
        ]);

        return $usuario;
    }

    public function login(array $dados): User
    {
          $dadosValidos = Validator::make($dados, [
            'email' => 'required|email',
            'password' => 'required|string',
            'dispositivo' => 'required|string',
        ])->validate();

        $usuario = User::where('email', $dadosValidos['email'])->first();

        if (!$usuario) {
            throw new \InvalidArgumentException('Email ou senha incorretos');
        }

        if (!Hash::check($dadosValidos['password'], $usuario->password)) {
            throw new \InvalidArgumentException('Email ou senha incorretos');
        }

        return $usuario;
    }
}
