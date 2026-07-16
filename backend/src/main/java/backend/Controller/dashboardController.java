package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Enum.curso;
import backend.Enum.humor;
import backend.Model.Dto.dashboard.*;
import backend.Service.dashboardService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(rotas.DASHBOARD)
@AllArgsConstructor
@Validated
public class dashboardController {

    private final dashboardService dashboardService;

    @GetMapping("/count")
    public ResponseEntity<?> contarDenuncias(
            @RequestParam(required = false) curso curso,

            @Min( value = 1, message = "O período deve ser maior ou igual a 1")
            @Max( value = 8, message = "O período deve ser menor ou igual a 8")
            @RequestParam(required = false) Integer periodo
    ) {
        countDto count = dashboardService.count(curso, periodo);
        return ResponseEntity.status(HttpStatus.OK).body(count);
    }

    @GetMapping("/semanal")
    public ResponseEntity<?> semanal(
            @RequestParam(required = false) curso curso,
            @RequestParam(required = false) Integer periodo
    ) {
        contagemSemanaDto contagem = dashboardService.contagemSemana();
        return ResponseEntity.status(HttpStatus.OK).body(contagem);
    }

    @GetMapping("/humorGeral")
    public ResponseEntity<?> humorGeral(
            @RequestParam(required = false) curso curso,
            @RequestParam(required = false) Integer periodo
    ) {
        humorGeralDto humor = dashboardService.humorMaisFrequente();
        return ResponseEntity.status(HttpStatus.OK).body(humor);
    }

    @GetMapping("/pizzaGrafico")
    public ResponseEntity<?> pizzaGrafico(
            @RequestParam(required = false) curso curso,
            @RequestParam(required = false) Integer periodo
    ) {
        List<pizzaGrafico> pizzas = dashboardService.buscaPorcentagemHumor();
        return ResponseEntity.status(HttpStatus.OK).body(pizzas);
    }

    @GetMapping("/categoriaGrafico")
    public ResponseEntity<?> categoriaGrafico(
            @RequestParam(required = false) curso curso,
            @RequestParam(required = false) Integer periodo
    ) {
        List<categoriaGraficoDto> categorias = dashboardService.buscaPorCategoria();
        return ResponseEntity.status(HttpStatus.OK).body(categorias);
    }

}
