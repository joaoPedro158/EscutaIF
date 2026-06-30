package backend.Model.Dto.Record;

import backend.Enum.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record acolhimentoRecord(
        humor humor,
    curso curso,
    genero genero,
    turno turno,
    Integer periodo
) {
}
