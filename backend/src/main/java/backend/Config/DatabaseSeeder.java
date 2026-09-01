package backend.Config;

import backend.Enum.*;
import backend.Model.Dto.Record.admRecord;
import backend.Repository.Entity.acolhimentoEntity;
import backend.Repository.Entity.admEntity;
import backend.Repository.Entity.denunciaEntity;
import backend.Repository.acolhimentoJpaRepository;
import backend.Repository.admJpaRepository;
import backend.Repository.denunciaJpaRepository;
import backend.Service.admService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
@AllArgsConstructor
@NoArgsConstructor
public class DatabaseSeeder {

    private static final tipoDenuncia[] TIPOS_DENUNCIA = tipoDenuncia.values();
    private static final statusDenuncia[] STATUS_DENUNCIAS = statusDenuncia.values();
    private static final String[] PRIMEIROS_NOMES = {
            "Joao", "Maria", "Pedro", "Ana", "Lucas", "Beatriz", "Gabriel", "Julia", "Rafael", "Larissa"
    };
    private static final String[] SOBRENOMES = {
            "Silva", "Souza", "Santos", "Oliveira", "Pereira", "Costa", "Almeida", "Ferreira"
    };
    private static final String[] LOCAIS = {
            "Bloco A", "Bloco B", "Laboratorio 1", "Laboratorio 2", "Biblioteca", "Pavilhao Central"
    };
    private static final String[] DESCRICOES = {
            "Relato de comportamento inadequado observado no ambiente institucional.",
            "Denuncia de atitude discriminatoria durante uma atividade coletiva.",
            "Registro de assedio verbal presenciado em area comum do campus.",
            "Relato de conduta ofensiva durante atendimento presencial.",
            "Ocorrencia de violencia psicologica em um espaco compartilhado."
    };


    private admService admService;

    @Bean
    CommandLineRunner seedDatabase (
            acolhimentoJpaRepository acolhimentoJpaRepository,
            denunciaJpaRepository denunciaJpaRepository,
            admJpaRepository admJpaRepository,
            admService admService
    ) {
        return args -> {
            if (acolhimentoJpaRepository.count() > 0 || denunciaJpaRepository.count() > 0) {
                System.out.println("ℹBanco de dados já possui registros. Semeador ignorado.");


                return;
            }

            if ( admJpaRepository.findByEmail("admin@exemplo.com").isEmpty() ) {

                admRecord admRecord = new admRecord(
                        "Admin", "admin@exemplo.com", "12345678", "12345678");
                admService.salvarAdm(admRecord);
            }

            Random random = new Random();
            curso[] cursos = curso.values();
            humor[] humors = humor.values();
            genero[] generos = genero.values();
            turno[] turnos = turno.values();

            List<acolhimentoEntity> acolhimentos = new ArrayList<>();

            for ( int i = 0; i <= 50; i++) {
                acolhimentoEntity a = new acolhimentoEntity();


                a.setCurso(cursos[random.nextInt(cursos.length)]);
                a.setPeriodo(random.nextInt(8) + 1); // Período de 1 a 8
                a.setHumor(humors[random.nextInt(humors.length)]);
                a.setGenero(generos[random.nextInt(generos.length)]);
                a.setTurno(turnos[random.nextInt(turnos.length)]);

                int diasAtras = random.nextInt(30);
                int horasAtras = random.nextInt(24);
                a.setCriado_em(LocalDateTime.now().minusDays(diasAtras).minusHours(horasAtras));

                acolhimentos.add(a);
            }

            acolhimentoJpaRepository.saveAll(acolhimentos);


            List<denunciaEntity> denuncias = new ArrayList<>();
            for (int i = 0; i < 50; i++) {
                denunciaEntity d = new denunciaEntity();
                String nomeAfetado = gerarNomeCompleto(random);

                d.setTipoDenuncia(TIPOS_DENUNCIA[random.nextInt(TIPOS_DENUNCIA.length)]);
                d.setDescricao(DESCRICOES[random.nextInt(DESCRICOES.length)]);
                d.setDataIncidente(LocalDateTime.now()
                        .minusDays(random.nextInt(365))
                        .minusHours(random.nextInt(24))
                        .minusMinutes(random.nextInt(60)));
                d.setLocal(LOCAIS[random.nextInt(LOCAIS.length)] + " - Sala " + (random.nextInt(300) + 1));
                d.setPessoaAfetada(nomeAfetado);
                d.setNome(gerarNomeCompleto(random));
                d.setEmail(gerarEmail(i));
                d.setTelefone(gerarTelefone(random));
                d.setStatus(STATUS_DENUNCIAS[random.nextInt(STATUS_DENUNCIAS.length)]);
                d.setCriado_em(LocalDateTime.now()
                        .minusDays(random.nextInt(30))
                        .minusHours(random.nextInt(24)));
                d.setAtualizado_em(d.getCriado_em().plusHours(random.nextInt(72)));

                denuncias.add(d);

            }


            denunciaJpaRepository.saveAll(denuncias);




        };
    }

    private String gerarNomeCompleto(Random random) {
        return PRIMEIROS_NOMES[random.nextInt(PRIMEIROS_NOMES.length)] + " "
                + SOBRENOMES[random.nextInt(SOBRENOMES.length)];
    }

    private String gerarEmail(int indice) {
        return String.format("denuncia.%03d@exemplo.com", indice + 1);
    }

    private String gerarTelefone(Random random) {
        long numero = 10_000_000_000L + Math.floorMod(random.nextLong(), 90_000_000_000L);
        return Long.toString(numero);
    }
}
