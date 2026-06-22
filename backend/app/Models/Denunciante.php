<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

#[Fillable(['nome', 'email', 'telefone'])]
class Denunciante extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'denunciante';
}
