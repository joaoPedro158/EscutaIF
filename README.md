# EscutaIF

Plataforma de acolhimento estudantil para o IFRN. Permite que estudantes registrem seu estado emocional (acolhimento) e façam denúncias de forma estruturada, enquanto a coordenação acompanha tudo em um dashboard com indicadores, séries semanais e relatórios paginados.

Este README documenta principalmente o **backend**: sua arquitetura, camadas e os padrões de projeto aplicados.

## Stack do backend

| Camada | Tecnologia |
|---|---|
| Linguagem / Framework | Java 21 + Spring Boot 4 |
| Persistência | Spring Data JPA + PostgreSQL |
| Segurança | Spring Security + JWT (`java-jwt`) |
| Mapeamento objeto-objeto | MapStruct |
| Boilerplate | Lombok |
| Validação | Bean Validation (`jakarta.validation`) |
| Build | Maven (`mvnw`) |
| Infra | Docker / docker-compose |

## Arquitetura

O backend segue uma **arquitetura em camadas (layered architecture)** próxima do padrão MVC de APIs REST, com uma separação explícita entre o modelo de domínio e o modelo de persistência:

```
Controller → Service → Repository → Entity (banco)
                ↑
             Mapper (Record ⇄ Model ⇄ Entity ⇄ Dto)
```

Estrutura de pacotes:

```
backend/
├── Config/          # Segurança, filtro JWT, seed de dados
├── Controller/       # Endpoints REST
│   └── Route/         # Constantes centralizadas de rotas
├── Enum/              # Vocabulário de domínio (curso, humor, turno, tipoDenuncia...)
├── Model/              # Modelo de domínio (POJOs "puros")
│   ├── Dto/             # Objetos de saída da API
│   │   └── Record/       # Objetos de entrada da API (records imutáveis)
│   └── Mapper/           # Interfaces MapStruct
├── Repository/         # Spring Data JPA
│   └── Entity/           # Entidades JPA (@Entity)
├── Service/            # Regras de negócio
└── exceptions/         # Exceções customizadas + handler global
```

O ponto central da arquitetura é a **separação entre `Model` (domínio) e `Entity` (persistência)**: a requisição chega como `Record`, é convertida em `Model`, validada, convertida em `Entity` para ser salva, e a resposta sai como `Dto`. Isso evita que a estrutura da tabela do banco vaze diretamente para a API.

## Padrões de projeto aplicados

- **DTO Pattern** — `Record` para entrada (imutável, com Bean Validation) e `Dto` para saída, isolando o contrato da API do modelo interno.
- **Mapper Pattern (via MapStruct)** — cada domínio tem uma interface `*Mapper` (ex: `acolhimentoMapper`) que centraliza as conversões `Record → Model → Entity → Dto`, eliminando construção manual de objetos nos services.
- **Repository Pattern** — acesso a dados isolado em interfaces `JpaRepository`, com queries derivadas e `@Query` customizadas (ex: `contarAcolhimentos`, `contarHumorAgrupados`) usadas pelo `dashboardService` para agregações.
- **Dependency Injection via construtor** — todas as classes usam `@AllArgsConstructor` (Lombok) para injeção via construtor, em vez de `@Autowired` em campo.
- **Chain of Responsibility (filtro de segurança)** — `securityFilter` estende `OncePerRequestFilter` e é inserido na cadeia de filtros do Spring Security (`addFilterBefore`) para validar o JWT antes da autenticação padrão.
- **Exception Handling centralizado (`@RestControllerAdvice`)** — `RestExceptionHandle` concentra o tratamento de todas as exceções (validação, enum inválido, regra de negócio, tipo incompatível) e as converte em um formato de erro único (`ErroResposta`).
- **Exceções de domínio customizadas** — `campoNuloException` e `regraNegocioException` carregam o `HttpStatus` correto junto da mensagem, mantendo a regra de negócio decidindo o status HTTP, não o controller.
- **Route constants** — a classe `rotas` centraliza os paths da API (`/api/adm`, `/api/denuncias`, ...), evitando strings mágicas espalhadas em controllers e na configuração de segurança.
- **Stateless authentication (JWT)** — sessão desabilitada (`SessionCreationPolicy.STATELESS`), autenticação feita por token Bearer validado a cada requisição, sem estado no servidor.
- **Seed programático (`CommandLineRunner`)** — `DatabaseSeeder` popula o banco com dados fictícios em ambiente de desenvolvimento.

## Segurança

- Autenticação **stateless** via JWT (HMAC256), com emissor, expiração e segredo configuráveis por variável de ambiente.
- Endpoints de cadastro (`/api/adm/form`, `/api/acolhimento/form`, `/api/denuncias/form`) e login são públicos; o restante da API — incluindo todo o `/api/dashboard/**` — exige autenticação.
- Senhas de administrador armazenadas com `BCryptPasswordEncoder`.
- `@EnableMethodSecurity` habilita autorização declarativa por método (`@PreAuthorize`) além das regras globais.

## Domínios da API

| Domínio | Endpoint base | Descrição |
|---|---|---|
| Acolhimento | `/api/acolhimento` | Registro do estado emocional do estudante (humor, curso, gênero, turno, período) |
| Denúncia | `/api/denuncias` | Abertura, atualização de status e detalhamento de denúncias |
| Administrador | `/api/adm` | Cadastro e login de administradores (emissão de JWT) |
| Dashboard | `/api/dashboard` | Indicadores agregados: contagens, série semanal, humor predominante, distribuição por categoria e relatório paginado |

## Rodando localmente

```bash
cd backend
docker-compose up --build
```

O `docker-compose.yml` sobe três serviços: banco PostgreSQL, API Spring Boot (porta `8080`) e frontend (porta `3000`), com variáveis sensíveis carregadas de um arquivo `.env`.

