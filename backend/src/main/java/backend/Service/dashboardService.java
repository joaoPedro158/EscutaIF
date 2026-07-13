package backend.Service;


import backend.Enum.humor;
import backend.Enum.statusDenuncia;
import backend.Enum.tipoDenuncia;
import backend.Model.Dto.dashboard.*;
import backend.Repository.acolhimentoJpaRepository;
import backend.Repository.denunciaJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

    public countDto count() {
        long qtdAcolhimento = acolhimentoJpaRepository.count();
        long qtdDenuncia = denunciaJpaRepository.count();
        long qtdPedente = denunciaJpaRepository.countByStatus(statusDenuncia.PENDENTE);
        return new countDto(qtdAcolhimento, qtdDenuncia, qtdPedente);
    }

    public contagemSemanaDto contagemSemana() {
        LocalDateTime hojeMeiaNoite = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime inicioDaSemana = hojeMeiaNoite.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.SUNDAY));

        long qtdAcolhimento = acolhimentoJpaRepository.contarRegistroSemana(inicioDaSemana);
        long qtdDenuncia = denunciaJpaRepository.contarRegistroSemana(inicioDaSemana);
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

    public List<pizzaGrafico> buscaPorcentagemHumor() {
        List<Object[]> dadosBrutos = acolhimentoJpaRepository.contarHumorAgrupados();

        long registroTotal =  0;
        for (Object[] dados : dadosBrutos) {
            registroTotal += (Long) dados[1];
        }
        List<pizzaGrafico> pizzas = new ArrayList<>();

        for (Object[] dados : dadosBrutos) {
            humor humor = (humor) dados[0];
            long quantidade = (Long) dados[1];
            double porcentagem = (double) quantidade / registroTotal * 100;

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
}
