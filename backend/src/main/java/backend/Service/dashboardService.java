package backend.Service;


import backend.Enum.curso;
import backend.Enum.humor;
import backend.Enum.statusDenuncia;
import backend.Enum.tipoDenuncia;
import backend.Model.Dto.dashboard.*;
import backend.Repository.acolhimentoJpaRepository;
import backend.Repository.denunciaJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class dashboardService {

    private final acolhimentoJpaRepository acolhimentoJpaRepository;
    private final denunciaJpaRepository denunciaJpaRepository;

    public countDto count(curso curso, Integer periodo, tipoDenuncia tipoDenuncia) {
        long qtdAcolhimento = acolhimentoJpaRepository.contarAcolhimentos(curso, periodo);
        long qtdDenuncia = denunciaJpaRepository.contarDenunciasPorStatus(tipoDenuncia, null);
        long qtdPedente = denunciaJpaRepository.contarDenunciasPorStatus(tipoDenuncia, statusDenuncia.PENDENTE);
        return new countDto(qtdAcolhimento, qtdDenuncia, qtdPedente);
    }

    public contagemSemanaDto contagemSemana(curso curso, Integer periodo, tipoDenuncia tipoDenuncia) {
        LocalDateTime hojeMeiaNoite = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime inicioDaSemana = hojeMeiaNoite.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.SUNDAY));
        LocalDateTime proximoDomingo = hojeMeiaNoite.with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));
        LocalDateTime fimDaSemana = proximoDomingo.with(LocalTime.MAX);

        long qtdAcolhimento = acolhimentoJpaRepository.contarRegistroSemana(inicioDaSemana,fimDaSemana,curso,periodo );
        long qtdDenuncia = denunciaJpaRepository.contarRegistroSemana(inicioDaSemana, fimDaSemana, tipoDenuncia);
        long qtdPedente = denunciaJpaRepository.contarRegistroSemanaStatus(inicioDaSemana, statusDenuncia.PENDENTE);
        return new contagemSemanaDto(qtdAcolhimento, qtdDenuncia, qtdPedente);
    }

    public humorGeralDto humorMaisFrequente() {
        humor humorgeral = acolhimentoJpaRepository.findFirstByOrderByHumor();
        humorGeralDto dto = new humorGeralDto();
        if (humorgeral == null) {
            dto.setHumor(humor.NEUTRO.getHumor());
            dto.setDescricao("Nenhum humor registrado");
        } else {
            dto.setHumor(humorgeral.getHumor());
            switch (humorgeral) {
                case MUITO_TRISTE -> dto.setDescricao("Intervenção Imediata Necessária");
                case TRISTE         -> dto.setDescricao("Demanda por Acolhimento em Alta");
                case NEUTRO         -> dto.setDescricao("Clima sob Controle");
                case FELIZ          -> dto.setDescricao("Ambiente Harmônico");
                case MUITO_FELIZ    -> dto.setDescricao("Clima Extremamente Seguro");
            }
        }

        return dto;
    }

    public List<pizzaGrafico> buscaPorcentagemHumor(curso curso, Integer periodo) {
        List<Object[]> dadosBrutos = acolhimentoJpaRepository.contarHumorAgrupados(curso, periodo);

        long registroTotal =  0;

        for (Object[] dados : dadosBrutos) {
            registroTotal += (Long) dados[1];
        }

        if (registroTotal == 0) {
            return new ArrayList<>();
        }
        List<pizzaGrafico> pizzas = new ArrayList<>();

        for (Object[] dados : dadosBrutos) {
            humor humor = (humor) dados[0];
            long quantidade = (Long) dados[1];
            double porcentagemBruta = (double) quantidade / registroTotal * 100;

            double porcentagem = BigDecimal.valueOf(porcentagemBruta)
                    .setScale(2, RoundingMode.HALF_UP)
                    .doubleValue();

            pizzas.add(new pizzaGrafico(humor.getHumor(), porcentagem));
        }
        return pizzas;

    }

    public List<categoriaGraficoDto> buscaPorCategoria() {
        List<Object[]> dadosBrutos = denunciaJpaRepository.QuantidadePorTipo();

        List<categoriaGraficoDto> categorias = new ArrayList<>();
        for (Object[] dados : dadosBrutos) {
            tipoDenuncia tipo = (tipoDenuncia) dados[0];
            long quantidade = (Long) dados[1];
            categorias.add(new categoriaGraficoDto(tipo.getTo_string(), quantidade));
        }
        return categorias;
    }

    public Page<relatorioDto> relatorio(int pagina) {

        Pageable pageable = PageRequest.of(
                pagina,
                10,
                Sort.by("criado_em").descending()
        );

        return denunciaJpaRepository.relatorio(pageable);
    }
}
