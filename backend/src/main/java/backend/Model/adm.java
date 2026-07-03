package backend.Model;

import lombok.*;

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
}
