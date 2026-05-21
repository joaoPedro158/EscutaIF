<?php
namespace App\Services;

use App\Models\acolher;
use App\Enum\Turno;
use App\Enum\Humor;
use App\Enum\Genero;
use App\Enum\Curso;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;


class AcolherService
{

    public function registra(array $dados): Acolher
    {

       $dadosValidos = Validator::make($dados, [
            'nome'   => 'nullable|string|max:255',
            'genero' => ['nullable', new Enum(Genero::class)],
            'curso'  => ['required', new Enum(Curso::class)],
            'periodo'=> ['required', 'integer', 'min:1'],
            'turno'  => ['required', new Enum(Turno::class)],
            'humor'  => ['required', new Enum(Humor::class)],
        ])->validate();
        $dadosSalvos =  Acolher::create($dadosValidos);

        return $dadosSalvos;
    }

    public function listar() : array
    {
        return Acolher::all()->toArray();
    }
}
