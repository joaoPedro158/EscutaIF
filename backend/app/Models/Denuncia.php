<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Enum\tipodenuncia;

#[Fillable(['nome', 'tipo', 'descricao','data_ocorrencia', 'local_ocorrencia', 'pessoa_afetada', 'testemunha','email','telefone'])]
class Denuncia extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'denuncia';

    protected function casts() : array {
        return [
            'tipo' => tipodenuncia::class
        ];
    }
}
