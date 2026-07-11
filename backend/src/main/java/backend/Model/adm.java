package backend.Model;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class adm {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String confirma_senha;
}
