package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Enum.humor;
import backend.Model.Dto.dashboard.contagemSemanaDto;
import backend.Model.Dto.dashboard.countDto;
import backend.Model.Dto.dashboard.humorGeralDto;
import backend.Model.Dto.dashboard.pizzaGrafico;
import backend.Service.dashboardService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(rotas.DASHBOARD)
@AllArgsConstructor
public class dashboardController {

    private final dashboardService dashboardService;

    @GetMapping("/count")
    public ResponseEntity<?> contarDenuncias() {
        countDto count = dashboardService.count();
        return ResponseEntity.status(HttpStatus.OK).body(count);
    }

    @GetMapping("/semanal")
    public ResponseEntity<?> semanal() {
        contagemSemanaDto contagem = dashboardService.contagemSemana();
        return ResponseEntity.status(HttpStatus.OK).body(contagem);
    }

    @GetMapping("/humorGeral")
    public ResponseEntity<?> humorGeral() {
        humorGeralDto humor = dashboardService.humorMaisFrequente();
        return ResponseEntity.status(HttpStatus.OK).body(humor);
    }

    @GetMapping("/pizzaGrafico")
    public ResponseEntity<?> pizzaGrafico() {
        List<pizzaGrafico> pizzas = dashboardService.buscaPorcentagemHumor();
        return ResponseEntity.status(HttpStatus.OK).body(pizzas);
    }

}
