package backend.Repository;

import backend.Enum.curso;
import backend.Enum.statusDenuncia;
import backend.Repository.Entity.denunciaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface denunciaJpaRepository extends JpaRepository<denunciaEntity, Integer> {
    long countByStatus(statusDenuncia status);

    @Query("SELECT count(a) from denunciaEntity a where a.criado_em >= :inicioDaSemana")
    long contarRegistroSemana(@Param("inicioDaSemana") LocalDateTime inicioDaSemana);


    @Query("SELECT count(a) from denunciaEntity a where a.criado_em >= :inicioDaSemana and a.status = :status")
    long contarRegistroSemanaStatus(@Param("inicioDaSemana") LocalDateTime inicioDaSemana,  @Param("status") statusDenuncia status);

    @Query("select d.tipoDenuncia, count(d) from denunciaEntity d group by d.tipoDenuncia")
    List<Object[]> QuantidadePorTipo();
}
