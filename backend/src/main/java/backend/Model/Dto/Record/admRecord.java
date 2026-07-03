package backend.Model.Dto.Record;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record admRecord(
        @NotBlank(message = "O nome e obrigatorio")
        @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
        String nome,

        @NotBlank(message = "O e-mail e obrigatorio")
        @Email(message = "O formato do e-mail digitado e invalido")
        String email,

        @NotBlank(message = "A senha e obrigatoria")
        @Size(min = 8, max = 100, message = "A senha deve ter entre 8 e 100 caracteres")
        String senha,

        String confirma_senha
) {
}
