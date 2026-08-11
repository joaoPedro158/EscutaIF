package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Model.Dto.Record.admRecord;
import backend.Model.Dto.Record.loginRecord;
import backend.Model.Dto.admDto;
import backend.Model.Dto.loginRespostaDto;
import backend.Service.admService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("permitAll()")
    public ResponseEntity saveAdm(@RequestBody @Valid admRecord adm) {
        admDto dto = service.salvarAdm(adm);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("/login/form")
    public ResponseEntity login(@RequestBody @Valid loginRecord login) {
        loginRespostaDto token = service.fazerLogin(login);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

}
