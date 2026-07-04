package backend.Service;


import backend.Model.Dto.Record.admRecord;
import backend.Model.Dto.Record.loginRecord;
import backend.Model.Dto.admDto;
import backend.Model.Dto.loginRespostaDto;
import backend.Model.Mapper.admMapper;
import backend.Model.adm;
import backend.Repository.Entity.admEntity;
import backend.Repository.admJpaRepository;
import backend.exceptions.regraNegocioException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class admService {

    private final admJpaRepository Repository;
    private final admMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final tokenService tokenService;


    public admDto salvarAdm(admRecord record) {
        adm admModel = mapper.toModel(record);
        if(!admModel.getSenha().equals(admModel.getConfirma_senha())) {
            throw new regraNegocioException("Senha e confirma senha nao conferem", HttpStatus.BAD_REQUEST);
        }
        String senhaHash = passwordEncoder.encode(admModel.getSenha());
        admModel.setSenha(senhaHash);
        admEntity entity = mapper.toEntity(admModel);
        admEntity savedEntity = Repository.save(entity);
        return mapper.toDto(savedEntity);
    }

    public loginRespostaDto fazerLogin(loginRecord login) {
        admEntity adm = Repository.findByEmail(login.email())
                .orElseThrow(() -> new regraNegocioException("Email ou senha inválidos", HttpStatus.UNAUTHORIZED));

        if (!passwordEncoder.matches(login.senha(), adm.getSenha())) {
            throw new regraNegocioException("Email ou senha inválidos", HttpStatus.UNAUTHORIZED);
        }
        String token = tokenService.gerarToken(adm.getEmail());
        return new loginRespostaDto(token);
    }
}
