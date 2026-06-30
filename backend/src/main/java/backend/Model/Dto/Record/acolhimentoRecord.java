package backend.Model.Dto.Record;

import backend.Enum.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record acolhimentoRecord(
        @NotNull(message = "Humor e obrigatorio")
        humor humor,
    @NotNull(message = " curso é obrigatorio")
    curso curso,

    @NotNull(message = "genero é obrigatorio")
    genero genero,

    @NotNull(message = "turno é obrigatorio")
    turno turno,

    @NotNull(message = "periodo é obrigatorio")
    int periodo
) {
}
