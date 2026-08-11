package backend.Model.Dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class countDto {
    long qtdAcolhimento;
    long qtdDenuncia;
    long qtdPedente;
}
