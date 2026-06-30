package backend.Repository.Entity;

import backend.Enum.tipoDenuncia;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "denuncia")
public class denunciaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private tipoDenuncia tipoDenuncia;

    private String descricao;
    private LocalDateTime dataIncidente;
    private String local;
    private String pessoaAfetada;
    private String nome;
    private String email;
    private String telefone;
}