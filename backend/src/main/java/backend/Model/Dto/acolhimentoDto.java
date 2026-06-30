package backend.Model.Dto;

import backend.Enum.*;
import lombok.*;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class acolhimentoDto {
   private humor humor;
   private curso curso;
   private genero genero;
   private turno turno;
   private int periodo;
}
