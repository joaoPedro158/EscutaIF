package backend.Model.Dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class admDto {
    private Long id;
    private String nome;
    private String email;
    private String senha;
}
