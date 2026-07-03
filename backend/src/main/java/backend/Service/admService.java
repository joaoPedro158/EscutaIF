package backend.Service;


import backend.Model.Dto.Record.admRecord;
import backend.Model.Dto.admDto;
import backend.Model.Mapper.admMapper;
import backend.Model.adm;
import backend.Repository.Entity.admEntity;
import backend.Repository.admJpaRepository;
import backend.exceptions.regraNegocioException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class admService {

    private final admJpaRepository Repository;
    private final admMapper mapper;


    public admDto salvarAdm(admRecord record) {
        adm admModel = mapper.toModel(record);
        if(!admModel.getSenha().equals(admModel.getConfirma_senha())) {
            throw new regraNegocioException("Senha e confirma senha nao conferem", HttpStatus.BAD_REQUEST);
        }

        admEntity entity = mapper.toEntity(admModel);
        admEntity savedEntity = Repository.save(entity);
        return mapper.toDto(savedEntity);
    }
}
