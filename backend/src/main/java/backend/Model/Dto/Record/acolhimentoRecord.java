package backend.Model.Dto.Record;

import backend.Enum.*;

public record acolhimentoRecord(
    humor humor,
    curso curso,
    genero genero,
    turno turno,
    int periodo
) {
}
