package backend.Model;

import backend.Enum.statusDenuncia;
import backend.Enum.tipoDenuncia;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class denuncia {
    private Long id;
    private tipoDenuncia tipoDenuncia;
    private String descricao;
    private LocalDateTime dataIncidente;
    private String local;
    private String pessoaAfetada;
    private String nome;
    private String email;
    private String telefone;
    private statusDenuncia status;
}