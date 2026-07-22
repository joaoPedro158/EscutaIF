package backend.Service;

import backend.Enum.statusDenuncia;
import backend.Model.Dto.Record.denunciaRecord;
import backend.Model.Dto.denunciaDto;
import backend.Model.Mapper.denunciaMapper;
import backend.Model.denuncia;
import backend.Repository.Entity.denunciaEntity;
import backend.Repository.denunciaJpaRepository;
import backend.exceptions.regraNegocioException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class denunciaService {

    private final denunciaJpaRepository denunciaJpaRepository;
    private final denunciaMapper denunciaMapper;

    public denunciaDto salvaDenuncia(denunciaRecord denunciaRecord) {
        denuncia denunciaModel = denunciaMapper.toModel(denunciaRecord);
        denunciaModel.setStatus(statusDenuncia.PENDENTE);

        if( denunciaModel.getPessoaAfetada() == null || denunciaModel.getPessoaAfetada().trim().isEmpty()) {
            denunciaModel.setPessoaAfetada("Anonimo");
        }

        if(denunciaModel.getNome() == null || denunciaModel.getNome().trim().isEmpty()) {
            denunciaModel.setNome("Anonimo");
        }

        if (denunciaModel.getLocal() == null || denunciaModel.getLocal().trim().isEmpty()) {
            denunciaModel.setLocal("Sem local declarado");
        }

        denunciaEntity entity = denunciaMapper.toEntity(denunciaModel);
        denunciaEntity savedEntity = denunciaJpaRepository.save(entity);
        denunciaModel.setId(savedEntity.getId());
        return denunciaMapper.toDto(denunciaModel);
    }


    public denunciaDto atualizarStatus(long id) {
        denunciaEntity denuncia = denunciaJpaRepository.findById(id);
        if (denuncia == null) {
            throw new regraNegocioException("Denúncia não encontrada", HttpStatus.BAD_REQUEST);
        }
        denuncia denunciaModel = denunciaMapper.toModel(denuncia);

        statusDenuncia statusAtual = denunciaModel.getStatus();
        statusDenuncia novoStatus = statusAtual.proximo();

        denunciaModel.setStatus(novoStatus);
        denunciaEntity entity = denunciaMapper.toEntity(denunciaModel);
        denunciaEntity savedEntity = denunciaJpaRepository.save(entity);

        return denunciaMapper.toDto(savedEntity);

    }

    public denunciaDto detalheDenuncia(long id) {
        denunciaEntity denuncia = denunciaJpaRepository.findById(id);
        if (denuncia == null) {
            throw new regraNegocioException("Denúncia não encontrada", HttpStatus.BAD_REQUEST);
        }

        return denunciaMapper.toDto(denuncia);

    }
}
