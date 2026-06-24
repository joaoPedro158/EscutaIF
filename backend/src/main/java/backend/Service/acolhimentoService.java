package backend.Service;

import backend.Model.Dto.Record.acolhimentoRecord;
import backend.Model.Dto.acolhimentoDto;
import backend.Model.Mapper.acolhimentoMapper;
import backend.Model.acolhimento;
import backend.Repository.Entity.acolhimentoEntity;
import backend.Repository.acolhimentoJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class acolhimentoService {

    private final acolhimentoJpaRepository acolhimentoJpaRepository;
    private final acolhimentoMapper mapper;

    public acolhimentoDto salvarAcolhimento(acolhimentoRecord record ) {
        acolhimento acolhimentoModel = mapper.toModel(record);
        acolhimentoEntity entity = mapper.toEntity(acolhimentoModel);
        acolhimentoJpaRepository.save(entity);
        return mapper.toDto(acolhimentoModel);
    }
}
