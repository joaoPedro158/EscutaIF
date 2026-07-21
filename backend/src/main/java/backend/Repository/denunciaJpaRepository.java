package backend.Repository;

import backend.Enum.curso;
import backend.Enum.statusDenuncia;
import backend.Enum.tipoDenuncia;
import backend.Model.Dto.dashboard.relatorioDto;
import backend.Repository.Entity.denunciaEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;

public interface denunciaJpaRepository extends JpaRepository<denunciaEntity, Long> {

    @Query(" select count(d) from denunciaEntity d " +
            " where (:tipoDenuncia is null or d.tipoDenuncia = :tipoDenuncia)" +
            " and (:statusDenuncia is null or d.status = :statusDenuncia)")
    long contarDenunciasPorStatus(
            @Param("tipoDenuncia") tipoDenuncia tipoDenuncia,
            @Param("statusDenuncia") statusDenuncia statusDenuncia
    );

    @Query("SELECT count(a) from denunciaEntity a where a.criado_em >= :inicioDaSemana" +
            " and a.criado_em <= :fimDaSemana" +
            " and (:tipoDenuncia is null or a.tipoDenuncia = :tipoDenuncia)")
    long contarRegistroSemana(@Param("inicioDaSemana") LocalDateTime inicioDaSemana,
                              @Param("fimDaSemana") LocalDateTime fimDaSemana,
                              @Param("tipoDenuncia") tipoDenuncia tipoDenuncia);

    @Query("SELECT count(a) from denunciaEntity a where a.criado_em >= :inicioDaSemana and a.status = :status")
    long contarRegistroSemanaStatus(@Param("inicioDaSemana") LocalDateTime inicioDaSemana,  @Param("status") statusDenuncia status);

    @Query("select d.tipoDenuncia, count(d) from denunciaEntity d " +
            " group by d.tipoDenuncia")
    List<Object[]> QuantidadePorTipo();

    @Query("select new backend.Model.Dto.dashboard.relatorioDto(" +
            "d.nome, d.tipoDenuncia, d.status, d.criado_em, d.dataIncidente) from denunciaEntity d")
    Page<relatorioDto> relatorio(Pageable pageable);
}
