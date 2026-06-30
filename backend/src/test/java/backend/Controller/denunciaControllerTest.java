package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Enum.tipoDenuncia;
import backend.Model.Dto.Record.denunciaRecord;
import backend.Repository.denunciaJpaRepository;
import tools.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class denunciaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private denunciaJpaRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void deveSalvarDenunciaValidaComCamposOpcionaisPreenchidos() throws Exception {
        denunciaRecord record = new denunciaRecord(
                tipoDenuncia.ASSEDIO,
                "Descrição do assédio ocorrido no corredor do bloco A",
                LocalDateTime.of(2026, 6, 29, 10, 0),
                "Bloco A",
                "João da Silva",
                "Maria Souza",
                "maria@exemplo.com",
                "123456789"
        );

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(record)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.tipoDenuncia", is("ASSEDIO")))
                .andExpect(jsonPath("$.descricao", is("Descrição do assédio ocorrido no corredor do bloco A")))
                .andExpect(jsonPath("$.local", is("Bloco A")))
                .andExpect(jsonPath("$.pessoaAfetada", is("João da Silva")))
                .andExpect(jsonPath("$.nome", is("Maria Souza")))
                .andExpect(jsonPath("$.email", is("maria@exemplo.com")))
                .andExpect(jsonPath("$.telefone", is("123456789")));

        assertEquals(1, repository.count());
    }

    @Test
    public void deveSalvarDenunciaValidaComCamposOpcionaisNulosETratarPessoaAfetadaComoAnonimo() throws Exception {
        denunciaRecord record = new denunciaRecord(
                tipoDenuncia.DISCRIMINACAO,
                "Descrição da discriminação sofrida",
                null,
                null,
                null,
                null,
                null,
                null
        );

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(record)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.tipoDenuncia", is("DISCRIMINACAO")))
                .andExpect(jsonPath("$.descricao", is("Descrição da discriminação sofrida")))
                .andExpect(jsonPath("$.pessoaAfetada", is("Anonimo")))
                .andExpect(jsonPath("$.local", nullValue()))
                .andExpect(jsonPath("$.nome", nullValue()))
                .andExpect(jsonPath("$.email", nullValue()))
                .andExpect(jsonPath("$.telefone", nullValue()));
    }

    @Test
    public void deveSalvarDenunciaValidaComPessoaAfetadaVaziaETratarComoAnonimo() throws Exception {
        denunciaRecord record = new denunciaRecord(
                tipoDenuncia.VIOLENCIA,
                "Descrição da violência",
                null,
                null,
                "   ",
                null,
                null,
                null
        );

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(record)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.pessoaAfetada", is("Anonimo")));
    }

    @Test
    public void deveRetornarBadRequestQuandoTipoDenunciaForNulo() throws Exception {
        denunciaRecord record = new denunciaRecord(
                null,
                "Descrição da denúncia",
                null,
                null,
                null,
                null,
                null,
                null
        );

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(record)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void deveRetornarBadRequestQuandoDescricaoForVazia() throws Exception {
        denunciaRecord record = new denunciaRecord(
                tipoDenuncia.OUTRO,
                "",
                null,
                null,
                null,
                null,
                null,
                null
        );

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(record)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void deveRetornarBadRequestTemporarioQuandoDescricaoForEmBranco() throws Exception {
        denunciaRecord record = new denunciaRecord(
                tipoDenuncia.OUTRO,
                "   ",
                null,
                null,
                null,
                null,
                null,
                null
        );

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(record)))
                .andExpect(status().isBadRequest());
    }
}
