package backend.Service;

import backend.Model.Dto.Record.denunciaRecord;
import backend.Model.Dto.denunciaDto;
import backend.Model.Mapper.denunciaMapper;
import backend.Model.denuncia;
import backend.Repository.Entity.denunciaEntity;
import backend.Repository.denunciaJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class denunciaService {

    private final denunciaJpaRepository denunciaJpaRepository;
    private final denunciaMapper denunciaMapper;

    public denunciaDto salvaDenuncia(denunciaRecord denunciaRecord) {
        denuncia denunciaModel = denunciaMapper.toModel(denunciaRecord);

        if( denunciaModel.getPessoaAfetada() == null || denunciaModel.getPessoaAfetada().trim().isEmpty()) {
            denunciaModel.setPessoaAfetada("Anonimo");
        }

        if (denunciaModel.getDescricao() == null || denunciaModel.getDescricao().trim().isEmpty()) {
            denunciaModel.setDescricao("Sem descrição");
        }

        denunciaEntity entity = denunciaMapper.toEntity(denunciaModel);
        denunciaEntity savedEntity = denunciaJpaRepository.save(entity);
        denunciaModel.setId(savedEntity.getId());
        return denunciaMapper.toDto(denunciaModel);
    }
}
