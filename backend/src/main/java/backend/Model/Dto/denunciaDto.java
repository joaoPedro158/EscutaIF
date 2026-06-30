package backend.Model.Dto;

import backend.Enum.tipoDenuncia;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class denunciaDto {
    private Long id;
    private tipoDenuncia tipoDenuncia;
    private String descricao;
    private LocalDateTime dataIncidente;
    private String local;
    private String pessoaAfetada;
    private String nome;
    private String email;
    private String telefone;
}