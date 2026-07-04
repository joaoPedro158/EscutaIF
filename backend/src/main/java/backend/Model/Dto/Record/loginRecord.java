package backend.Model.Dto.Record;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record loginRecord(
        @NotBlank(message = "O e-mail e obrigatorio")
        @Email(message = "O formato do e-mail digitado e invalido")
        String email,

        @NotBlank(message = "A senha e obrigatoria")
        @Size(min = 8, max = 100, message = "A senha deve ter entre 8 e 100 caracteres")
        String senha
) {
}
