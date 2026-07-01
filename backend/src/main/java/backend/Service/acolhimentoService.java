package backend.Service;

import backend.Model.Dto.Record.acolhimentoRecord;
import backend.Model.Dto.acolhimentoDto;
import backend.Model.Mapper.acolhimentoMapper;
import backend.Model.acolhimento;
import backend.Repository.Entity.acolhimentoEntity;
import backend.Repository.acolhimentoJpaRepository;
import backend.exceptions.campoNuloException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class acolhimentoService {

    private final acolhimentoJpaRepository acolhimentoJpaRepository;
    private final acolhimentoMapper mapper;

    public acolhimentoDto salvarAcolhimento(acolhimentoRecord record ) {
        acolhimento acolhimentoModel = mapper.toModel(record);

        if(acolhimentoModel.getCurso() == null) {
            throw new campoNuloException("o campo curos não pode ser nulo");
        }
        if(acolhimentoModel.getGenero() == null) {
            throw new campoNuloException("o campo genero não pode ser nulo");
        }
        if(acolhimentoModel.getHumor() == null) {
            throw new campoNuloException("o campo humor não pode ser nulo");
        }
        if(acolhimentoModel.getTurno() == null) {
            throw new campoNuloException("o campo turno não pode ser nulo");
        }



        acolhimentoEntity entity = mapper.toEntity(acolhimentoModel);
        acolhimentoJpaRepository.save(entity);
        return mapper.toDto(acolhimentoModel);
    }
}
