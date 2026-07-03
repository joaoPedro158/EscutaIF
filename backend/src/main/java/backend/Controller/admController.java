package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Model.Dto.Record.admRecord;
import backend.Model.Dto.admDto;
import backend.Service.admService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(rotas.ADM)
@AllArgsConstructor
public class admController {

    private final admService service;

    @PostMapping("/form")
    public ResponseEntity saveAdm(@RequestBody @Valid admRecord adm) {
        admDto dto = service.salvarAdm(adm);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }
}
