package backend.Model.Dto.Record;

import backend.Enum.tipoDenuncia;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record denunciaRecord(
        @NotNull(message = "Tipo de denuncia e obrigatorio")
        tipoDenuncia tipoDenuncia,

        @NotBlank(message = "Descricao e obrigatoria")
        String descricao,

        LocalDateTime dataIncidente,
        String local,
        String pessoaAfetada,
        String nome,
        String email,
        String telefone
) {
}