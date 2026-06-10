<?php
namespace App\Services;

use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Denuncia;
use App\Enum\tipodenuncia;


class DenunciaService
{

    public function registra(array $dados): Denuncia
    {

       $dadosValidos = Validator::make($dados, [
            'nome'   => 'nullable|string|max:255',
            'tipo'   => ['required', new Enum(tipodenuncia::class)],
            'data_ocorrencia' => 'nullable|date',
            'descricao' => 'required|string'
        ])->validate();

        $dadosSalvos =  Denuncia::create($dadosValidos);

        return $dadosSalvos;
    }

    public function listar(): LengthAwarePaginator
    {
        return Denuncia::orderBy('created_at', 'desc')->paginate(10);
    }
}
