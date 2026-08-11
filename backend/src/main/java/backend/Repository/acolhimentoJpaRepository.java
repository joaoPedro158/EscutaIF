package backend.Repository;

import backend.Enum.curso;
import backend.Enum.humor;
import backend.Repository.Entity.acolhimentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface acolhimentoJpaRepository extends JpaRepository<acolhimentoEntity, Integer> {
    @Query("SELECT count(a) from acolhimentoEntity a where a.criado_em >= :inicioDaSemana " +
            "and a.criado_em <= :fimDaSemana " +
            "and (:curso is null or a.curso = :curso) " +
            "and (:periodo is null or a.periodo = :periodo)")
    long contarRegistroSemana(@Param("inicioDaSemana") LocalDateTime inicioDaSemana,
                              @Param("fimDaSemana") LocalDateTime fimDaSemana,
                              @Param("curso") curso curso,
                              @Param("periodo") Integer periodo);

    @Query("select a.humor from acolhimentoEntity a " +
            "group by a.humor " +
            "order by count(a) desc limit 1")
    humor findFirstByOrderByHumor();


    @Query("select a.humor, count(a) from acolhimentoEntity a" +
            " where (:curso is null or a.curso = :curso) " +
            " and (:periodo is null or a.periodo = :periodo)" +
            " group by a.humor ")
    List<Object[]> contarHumorAgrupados( @Param("curso") curso curso,
                                         @Param("periodo") Integer periodo);

    @Query("select count(a) from acolhimentoEntity a where " +
            "(:curso is null or a.curso = :curso) and " +
            "(:periodo is null or a.periodo = :periodo)")
    long contarAcolhimentos(@Param("curso") curso curso,
                            @Param("periodo") Integer periodo
    );


}