package backend.Model.Dto;

import backend.Enum.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

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
   private Integer periodo;
}
