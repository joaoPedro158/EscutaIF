package backend.Repository;

import backend.Repository.Entity.acolhimentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface acolhimentoJpaRepository extends JpaRepository<acolhimentoEntity, Integer> {
    @Query("SELECT count(a) from acolhimentoEntity a where a.criado_em >= :inicioDaSemana")
    long contarRegistroSemana(@Param("inicioDaSemana")LocalDateTime inicioDaSemana);
}
