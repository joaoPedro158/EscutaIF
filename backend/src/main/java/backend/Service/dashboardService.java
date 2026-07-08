package backend.Service;


import backend.Model.Dto.dashboard.countDto;
import backend.Repository.acolhimentoJpaRepository;
import backend.Repository.denunciaJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class dashboardService {

    private final acolhimentoJpaRepository acolhimentoJpaRepository;
    private final denunciaJpaRepository denunciaJpaRepository;

    public countDto count() {
        long qtdAcolhimento = acolhimentoJpaRepository.count();
        long qtdDenuncia = denunciaJpaRepository.count();
        return new countDto(qtdAcolhimento, qtdDenuncia);
    }
}
