package backend.Model.Dto.dashboard;

import backend.Enum.curso;
import backend.Enum.statusDenuncia;
import backend.Enum.tipoDenuncia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class relatorioDto {
    private String nome;
    private tipoDenuncia tipoDenuncia;
    private statusDenuncia status;
    private LocalDateTime criado_em;
    private LocalDateTime dataIncidente;
}
