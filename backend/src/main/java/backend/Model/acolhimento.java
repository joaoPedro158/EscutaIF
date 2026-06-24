package backend.Model;

import backend.Enum.*;
import lombok.*;

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
    private int periodo;


}
