package backend.Model.Dto.dashboard;

import backend.Enum.humor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class humorGeralDto {
    String humor;
    String descricao;
}
