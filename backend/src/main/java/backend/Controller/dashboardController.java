package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Model.Dto.dashboard.countDto;
import backend.Service.dashboardService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
