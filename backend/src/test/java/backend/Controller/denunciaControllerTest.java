package backend.Controller;

import backend.Controller.Route.rotas;
import backend.Enum.tipoDenuncia;
import backend.Model.Dto.Record.denunciaRecord;
import backend.Repository.denunciaJpaRepository;
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
    private denunciaJpaRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void deveSalvarDenunciaValidaComCamposOpcionaisPreenchidos() throws Exception {
        String json = """
                {
                  "tipoDenuncia": "ASSEDIO",
                  "descricao": "Relato detalhado do incidente ocorrido no setor de operações.",
                  "dataIncidente": "2026-06-29T10:43:00",
                  "local": "Escritório Central - Sala 3",
                  "pessoaAfetada": null,
                  "nome": "João da Silva",
                  "email": "joao.silva@email.com",
                  "telefone": "11999999999"
                }
                """;

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.tipoDenuncia", is("ASSEDIO")))
                .andExpect(jsonPath("$.descricao", is("Relato detalhado do incidente ocorrido no setor de operações.")))
                .andExpect(jsonPath("$.dataIncidente", is("2026-06-29T10:43:00")))
                .andExpect(jsonPath("$.local", is("Escritório Central - Sala 3")))
                .andExpect(jsonPath("$.pessoaAfetada", is("Anonimo")))
                .andExpect(jsonPath("$.nome", is("João da Silva")))
                .andExpect(jsonPath("$.email", is("joao.silva@email.com")))
                .andExpect(jsonPath("$.telefone", is("11999999999")));

        assertEquals(1, repository.count());
    }

    @Test
    public void deveSalvarDenunciaValidaComCamposOpcionaisNulosETratarPessoaAfetadaComoAnonimo() throws Exception {
        String json = """
                {
                  "tipoDenuncia": "DISCRIMINACAO",
                  "descricao": "Descrição da discriminação sofrida",
                  "dataIncidente": null,
                  "local": null,
                  "pessoaAfetada": null,
                  "nome": null,
                  "email": null,
                  "telefone": null
                }
                """;

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
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
        String json = """
                {
                  "tipoDenuncia": "VIOLENCIA",
                  "descricao": "Descrição da violência",
                  "dataIncidente": null,
                  "local": null,
                  "pessoaAfetada": "   ",
                  "nome": null,
                  "email": null,
                  "telefone": null
                }
                """;

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.pessoaAfetada", is("Anonimo")));
    }

    @Test
    public void deveRetornarBadRequestQuandoTipoDenunciaForNulo() throws Exception {
        String json = """
                {
                  "tipoDenuncia": null,
                  "descricao": "Descrição da denúncia",
                  "dataIncidente": null,
                  "local": null,
                  "pessoaAfetada": null,
                  "nome": null,
                  "email": null,
                  "telefone": null
                }
                """;

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem", containsString("tipoDenuncia: Tipo de denuncia e obrigatorio")));
    }

    @Test
    public void deveRetornarBadRequestQuandoDescricaoForVazia() throws Exception {
        String json = """
                {
                  "tipoDenuncia": "OUTRO",
                  "descricao": "",
                  "dataIncidente": null,
                  "local": null,
                  "pessoaAfetada": null,
                  "nome": null,
                  "email": null,
                  "telefone": null
                }
                """;

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem", containsString("descricao")));
    }

    @Test
    public void deveRetornarBadRequestTemporarioQuandoDescricaoForEmBranco() throws Exception {
        String json = """
                {
                  "tipoDenuncia": "OUTRO",
                  "descricao": "   ",
                  "dataIncidente": null,
                  "local": null,
                  "pessoaAfetada": null,
                  "nome": null,
                  "email": null,
                  "telefone": null
                }
                """;

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem", containsString("descricao")));
    }

    @Test
    public void deveRetornarBadRequestQuandoTelefoneNaoForNumerico() throws Exception {
        String json = """
                {
                  "tipoDenuncia": "ASSEDIO",
                  "descricao": "Relato detalhado do incidente ocorrido no setor de operações.",
                  "dataIncidente": "2026-06-29T10:43:00",
                  "local": "Escritório Central - Sala 3",
                  "pessoaAfetada": null,
                  "nome": "João da Silva",
                  "email": "joao.silva@email.com",
                  "telefone": "11-9999-9999"
                }
                """;

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem", containsString("telefone")))
                .andExpect(jsonPath("$.mensagem", containsString("apenas números")));
    }

    @Test
    public void deveRetornarBadRequestQuandoEmailNaoTiverFormatoValido() throws Exception {
        String json = """
                {
                  "tipoDenuncia": "ASSEDIO",
                  "descricao": "Relato detalhado do incidente ocorrido no setor de operações.",
                  "dataIncidente": "2026-06-29T10:43:00",
                  "local": "Escritório Central - Sala 3",
                  "pessoaAfetada": null,
                  "nome": "João da Silva",
                  "email": "email-invalido",
                  "telefone": "11999999999"
                }
                """;

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem", containsString("email")))
                .andExpect(jsonPath("$.mensagem", containsString("inválido")));
    }

    @Test
    public void deveRetornarBadRequestQuandoRequisicaoNaoForJsonValido() throws Exception {
        String corpoInvalido = "isso não é json";

        mockMvc.perform(post(rotas.DENUNCIAS + "/form")
                .contentType(MediaType.APPLICATION_JSON)
                .content(corpoInvalido))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem", is("Valor inválido no corpo da requisição")));
    }
}
