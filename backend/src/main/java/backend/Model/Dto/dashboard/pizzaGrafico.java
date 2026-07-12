package backend.Model.Dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class pizzaGrafico {
    private String humor;
    private long quantidade;
    private double porcentagem;
}
