<?php

namespace App\Enum;

enum tipodenuncia : string
{
    case ABUSO_FISICO = 'abuso físico';
    case ABUSO_SEXUAL = 'abuso sexual';
    case ABUSO_PSICOLOGICO = 'abuso psicológico';
    case BULLYING = 'bullying';
    case DESCRIMINAÇÃO = 'discriminação';
    case outro = 'outro';
}
