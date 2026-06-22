<?php
namespace App\Services;

use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Denuncia;
use App\Models\Denunciante;
use App\Enum\tipodenuncia;


class DenunciaService
{

    public function registra(array $dados): Denuncia
    {

       $dadosValidos = Validator::make($dados, [
            'nome'   => 'nullable|string|max:255',
            'email'  => 'nullable|max:255',
            'tipo'   => ['required', new Enum(tipodenuncia::class)],
            'data_ocorrencia' => 'required|date',
            'local_ocorrencia' => 'nullable|string|max:255',
            'pessoa_afetada' => 'nullable|string|max:255',
            'testemunha' => 'nullable|string|max:255',
            'descricao' => 'required|string'
        ])->validate();

        $denuncianteId = null;

        if (!empty($dadosValidos['nome']) && !empty($dadosValidos['email'])) {


            $denunciante = Denunciante::firstOrCreate(
                ['email' => $dadosValidos['email']],
                [
                    'nome' => $dadosValidos['nome'],
                    'telefone' => $dadosValidos['telefone'] ?? null
                ]
            );

            $denuncianteId = $denunciante->id;
        }


        $dadosSalvos =  Denuncia::create([
            'tipo' => $dadosValidos['tipo'],
            'descricao' => $dadosValidos['descricao'],
            'data_ocorrencia' => $dadosValidos['data_ocorrencia'],
            'local_ocorrencia' => $dadosValidos['local_ocorrencia'] ?? null,
            'pessoa_afetada' => $dadosValidos['pessoa_afetada'] ?? null,
            'testemunha' => $dadosValidos['testemunha'] ?? null,
            'denunciante_id' => $denuncianteId
        ]);

        return $dadosSalvos;
    }

    public function listar(): LengthAwarePaginator
    {
        return Denuncia::orderBy('created_at', 'desc')->paginate(10);
    }
}
