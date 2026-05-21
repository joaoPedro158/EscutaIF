<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Enum\genero;
use App\Enum\turno;
use App\Enum\humor;
use App\Enum\curso;

#[Fillable(['nome', 'genero', 'turno', 'humor', 'curso', 'periodo'])]
class Acolher extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'acolher';

    protected function casts() : array {
        return [
            'genero' => genero::class,
            'turno' => turno::class,
            'humor' => humor::class,
            'curso' => curso::class
        ];
    }
}
