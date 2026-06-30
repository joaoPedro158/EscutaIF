package backend.Model.Dto.Record;

import backend.Enum.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record acolhimentoRecord(
        humor humor,
    curso curso,
    genero genero,
    turno turno,


        @NotNull(message = "O campo 'periodo' não pode ser nulo")
        @Min(value = 1, message = "O campo 'periodo' deve ser maior que 0")
        @Max(value = 4, message = "O campo 'periodo' deve ser no máximo 4")
    Integer periodo
) {
}
