package backend.Model;

import backend.Enum.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class acolhimento {
    private humor humor;
    private curso curso;
    private genero genero;
    private turno turno;
    private Integer periodo;


}
