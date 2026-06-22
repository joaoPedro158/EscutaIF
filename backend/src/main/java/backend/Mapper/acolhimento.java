package backend.Mapper;

import backend.Enum.curso;
import backend.Enum.emocao;
import backend.Enum.genero;
import backend.Enum.turno;

public record acolhimento(
    emocao emocao,
    curso curso,
    genero genero,
    turno turno,
    int periodo
) {
}
