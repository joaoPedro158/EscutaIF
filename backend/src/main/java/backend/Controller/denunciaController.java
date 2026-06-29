package backend.Controller;

import backend.Model.Dto.Record.denunciaRecord;
import backend.Model.Dto.denunciaDto;
import backend.Service.denunciaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import backend.Controller.Route.rotas;

@RestController
@AllArgsConstructor
@RequestMapping(rotas.DENUNCIAS)
public class denunciaController {

    private final denunciaService denunciaService;

    @PostMapping("/form")
    public ResponseEntity salvaDenuncia(@Valid @RequestBody denunciaRecord denunciaRecord) {
       denunciaDto dto = denunciaService.salvaDenuncia(denunciaRecord);
       return ResponseEntity.ok(dto);
    }
}
