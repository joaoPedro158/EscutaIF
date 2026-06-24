package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Model.Dto.Record.acolhimentoRecord;
import backend.Model.Dto.acolhimentoDto;
import backend.Service.acolhimentoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(rotas.ACOLHIMENTO)
@AllArgsConstructor
public class acolhimentoController {

    private final acolhimentoService service;
    @PostMapping("/form")
    public ResponseEntity saveAcolhimento(@RequestBody acolhimentoRecord record) {
        acolhimentoDto dto = service.salvarAcolhimento(record);
        return ResponseEntity.ok(dto);

    }
}
