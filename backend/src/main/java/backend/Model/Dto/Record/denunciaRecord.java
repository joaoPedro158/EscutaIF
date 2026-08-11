package backend.Model.Dto.Record;

import backend.Enum.statusDenuncia;
import backend.Enum.tipoDenuncia;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record denunciaRecord(
        @NotNull(message = "Tipo de denuncia e obrigatorio")
        tipoDenuncia tipoDenuncia,

        @NotBlank(message = "Descricao e obrigatoria")
        String descricao,

        @PastOrPresent(message = "A data da ocorrência não pode ser uma data futura")
        LocalDateTime dataIncidente,
        String local,

        @Pattern(
                regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$",
                message = "O nome deve conter apenas letras e espaços"
        )
        String pessoaAfetada,
        @Pattern(
                regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$",
                message = "O nome deve conter apenas letras e espaços"
        )
        String nome,
        @Email(message = "O formato do e-mail digitado é inválido")
        String email,
        @Size(min = 10, max = 15, message = "O telefone deve ter entre 10 e 15 dígitos")
        @Pattern(
                regexp = "^[0-9]+$",
                message = "O campo deve conter apenas números, sem letras ou símbolos"
        )
        String telefone
) {
}