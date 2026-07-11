package backend.Repository.Entity;

import backend.Enum.curso;
import backend.Enum.humor;
import backend.Enum.genero;
import backend.Enum.turno;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "acolhimento")
@EntityListeners(AuditingEntityListener.class)
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

    private Integer periodo;

    @CreatedDate
    private LocalDateTime criado_em;

    @LastModifiedDate
    private LocalDateTime atualizado_em;
}
