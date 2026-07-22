package backend.Controller;

import backend.Model.Dto.Record.denunciaRecord;
import backend.Model.Dto.denunciaDto;
import backend.Service.denunciaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backend.Controller.Route.rotas;

@RestController
@AllArgsConstructor
@RequestMapping(rotas.DENUNCIAS)
public class denunciaController {

    private final denunciaService denunciaService;

    @PostMapping("/form")
    public ResponseEntity salvaDenuncia(@Valid @RequestBody denunciaRecord denunciaRecord) {
       denunciaDto dto = denunciaService.salvaDenuncia(denunciaRecord);
       return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }


    @GetMapping("atualizarStatus/{id}")
    public ResponseEntity atualizarStatus(@PathVariable long id){
        denunciaDto dto = denunciaService.atualizarStatus(id);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}
