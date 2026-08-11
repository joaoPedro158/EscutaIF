package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Enum.curso;
import backend.Enum.genero;
import backend.Enum.humor;
import backend.Enum.turno;
import backend.Model.Dto.Record.acolhimentoRecord;
import backend.Repository.acolhimentoJpaRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@WithMockUser
public class acolhimentoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private acolhimentoJpaRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void DeveSalavrAcolhimentoComOsCamposPreenchidos() throws Exception{
        acolhimentoRecord record = new acolhimentoRecord(
               humor.FELIZ, curso.INFORMATICA, genero.FEMININO, turno.MATUTINO,2
        );
        String json = objectMapper.writeValueAsString(record);



        mockMvc.perform(post(rotas.ACOLHIMENTO + "/form")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))

                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.curso").value("INFORMATICA"))
                .andExpect(jsonPath("$.genero").value("FEMININO"))
                .andExpect(jsonPath("$.periodo").value(2));

        assertEquals(1, repository.count());
    }

    @Test
    public void DeveRetornaMensagemDeErroSobreHumorNulo() throws Exception{
        acolhimentoRecord record = new acolhimentoRecord(
                null, curso.INFORMATICA, genero.FEMININO, turno.MATUTINO,2
        );
        String json = objectMapper.writeValueAsString(record);

        mockMvc.perform(post(rotas.ACOLHIMENTO + "/form")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))

                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("400 BAD_REQUEST"))
                .andExpect(jsonPath("$.mensagem").value("o campo humor não pode ser nulo"));

        assertEquals(0, repository.count());
    }

    @Test
    public void DeveRetornaMensagemDeErroSobreGeneroNulo() throws Exception{
        acolhimentoRecord record = new acolhimentoRecord(
                humor.FELIZ, curso.INFORMATICA, null, turno.MATUTINO,2
        );
        String json = objectMapper.writeValueAsString(record);

        mockMvc.perform(post(rotas.ACOLHIMENTO + "/form")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))

                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("400 BAD_REQUEST"))
                .andExpect(jsonPath("$.mensagem").value("o campo genero não pode ser nulo"));

        assertEquals(0, repository.count());
    }

    @Test
    public void DeveRetornaMensagemDeErroSobreCursoNulo() throws Exception{
        acolhimentoRecord record = new acolhimentoRecord(
                humor.FELIZ, null, genero.FEMININO, turno.MATUTINO,2
        );
        String json = objectMapper.writeValueAsString(record);

        mockMvc.perform(post(rotas.ACOLHIMENTO + "/form")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))

                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("400 BAD_REQUEST"))
                .andExpect(jsonPath("$.mensagem").value("o campo curso não pode ser nulo"));

        assertEquals(0, repository.count());
    }

    @Test
    public void DeveRetornaMensagemDeErroSobreTurnoNulo() throws Exception{
        acolhimentoRecord record = new acolhimentoRecord(
                humor.FELIZ, curso.INFORMATICA, genero.FEMININO, null,2
        );
        String json = objectMapper.writeValueAsString(record);

        mockMvc.perform(post(rotas.ACOLHIMENTO + "/form")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))

                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("400 BAD_REQUEST"))
                .andExpect(jsonPath("$.mensagem").value("o campo turno não pode ser nulo"));

        assertEquals(0, repository.count());
    }

    @Test
    public void DeveRetornaMensagemDeErroSobrePeriodoNulo() throws Exception{
        acolhimentoRecord record = new acolhimentoRecord(
                humor.FELIZ, curso.INFORMATICA, genero.FEMININO, turno.MATUTINO,null
        );
        String json = objectMapper.writeValueAsString(record);

        mockMvc.perform(post(rotas.ACOLHIMENTO + "/form")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))

                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("400 BAD_REQUEST"))
                .andExpect(jsonPath("$.mensagem").value("periodo: O campo periodo não pode ser nulo"));

        assertEquals(0, repository.count());
    }

    @Test
    public void DeveRetornaMensagemDeErroSobrePeriodoSerMenorQue0() throws Exception{
        acolhimentoRecord record = new acolhimentoRecord(
                humor.FELIZ, curso.INFORMATICA, genero.FEMININO, turno.MATUTINO,-1
        );
        String json = objectMapper.writeValueAsString(record);

        mockMvc.perform(post(rotas.ACOLHIMENTO + "/form")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))

                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("400 BAD_REQUEST"))
                .andExpect(jsonPath("$.mensagem").value("periodo: O campo periodo deve ser maior que 0"));

        assertEquals(0, repository.count());
    }

    @Test
    public void DeveRetornaMensagemDeErroSobrePeriodoSerMaiorQue4() throws Exception{
        acolhimentoRecord record = new acolhimentoRecord(
                humor.FELIZ, curso.INFORMATICA, genero.FEMININO, turno.MATUTINO,5
        );
        String json = objectMapper.writeValueAsString(record);

        mockMvc.perform(post(rotas.ACOLHIMENTO + "/form")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))

                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("400 BAD_REQUEST"))
                .andExpect(jsonPath("$.mensagem").value("periodo: O campo periodo deve ser no máximo 4"));

        assertEquals(0, repository.count());
    }

}

