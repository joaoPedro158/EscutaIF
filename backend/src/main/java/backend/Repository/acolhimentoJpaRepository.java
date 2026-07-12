package backend.Repository;

import backend.Enum.humor;
import backend.Enum.statusDenuncia;
import backend.Repository.Entity.acolhimentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface acolhimentoJpaRepository extends JpaRepository<acolhimentoEntity, Integer> {
    @Query("SELECT count(a) from acolhimentoEntity a where a.criado_em >= :inicioDaSemana")
    long contarRegistroSemana(@Param("inicioDaSemana") LocalDateTime inicioDaSemana);

    @Query("select a.humor from acolhimentoEntity a " +
            "group by a.humor " +
            "order by count(a) desc limit 1")
    humor findFirstByOrderByHumor();


    @Query("select a.humor, count(a) from acolhimentoEntity a group by a.humor")
    List<Object[]> contarHumorAgrupados();
}