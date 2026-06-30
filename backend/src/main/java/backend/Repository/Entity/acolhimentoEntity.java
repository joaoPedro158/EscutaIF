package backend.Repository.Entity;

import backend.Enum.curso;
import backend.Enum.humor;
import backend.Enum.genero;
import backend.Enum.turno;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "acolhimento")
public class acolhimentoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private humor humor;

    @Enumerated(EnumType.STRING)
    private curso curso;

    @Enumerated(EnumType.STRING)
    private genero genero;

    @Enumerated(EnumType.STRING)
    private turno turno;

    private int periodo;
}
