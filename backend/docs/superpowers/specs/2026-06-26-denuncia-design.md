# Design Spec - Recurso de Denúncia

## Contexto e Objetivo
Criar classes de modelo, entidade, DTOs, Record e Mapper para o recurso de denúncia, seguindo o padrão estabelecido no projeto (ex: `acolhimento`).

## Requisitos de Dados
- **id**: Long (gerado automaticamente no banco)
- **tipoDenuncia**: Enum `tipoDenuncia` (obrigatório)
- **descricao**: String (obrigatório, não vazio)
- **dataIncidente**: LocalDateTime (opcional)
- **local**: String (opcional)
- **pessoaAfetada**: String (opcional. Se vazio/nulo na requisição, deve ser tratado para "Anonimo")
- **nome**: String (opcional)
- **email**: String (opcional)
- **telefone**: String (opcional)

## Componentes

### 1. Model (`backend.Model.denuncia`)
Classe de domínio com Lombok:
- `@Getter`
- `@Setter`
- `@Builder`
- `@NoArgsConstructor`
- `@AllArgsConstructor`

```java
package backend.Model;

import backend.Enum.tipoDenuncia;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class denuncia {
    private Long id;
    private tipoDenuncia tipoDenuncia;
    private String descricao;
    private LocalDateTime dataIncidente;
    private String local;
    private String pessoaAfetada;
    private String nome;
    private String email;
    private String telefone;
}
```

### 2. Entity (`backend.Repository.Entity.denunciaEntity`)
Mapeamento JPA para tabela `denuncia`:
- `@Entity`
- `@Table(name = "denuncia")`
- `@Enumerated(EnumType.STRING)` para `tipoDenuncia`

```java
package backend.Repository.Entity;

import backend.Enum.tipoDenuncia;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "denuncia")
public class denunciaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private tipoDenuncia tipoDenuncia;

    private String descricao;
    private LocalDateTime dataIncidente;
    private String local;
    private String pessoaAfetada;
    private String nome;
    private String email;
    private String telefone;
}
```

### 3. DTO (`backend.Model.Dto.denunciaDto`)
DTO de saída para API:
- `@Getter`
- `@Setter`
- `@Builder`
- `@NoArgsConstructor`
- `@AllArgsConstructor`

```java
package backend.Model.Dto;

import backend.Enum.tipoDenuncia;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class denunciaDto {
    private Long id;
    private tipoDenuncia tipoDenuncia;
    private String descricao;
    private LocalDateTime dataIncidente;
    private String local;
    private String pessoaAfetada;
    private String nome;
    private String email;
    private String telefone;
}
```

### 4. Record (`backend.Model.Dto.Record.denunciaRecord`)
Para entrada de dados com validações:

```java
package backend.Model.Dto.Record;

import backend.Enum.tipoDenuncia;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record denunciaRecord(
    @NotNull(message = "Tipo de denuncia e obrigatorio")
    tipoDenuncia tipoDenuncia,

    @NotBlank(message = "Descricao e obrigatoria")
    String descricao,

    LocalDateTime dataIncidente,
    String local,
    String pessoaAfetada,
    String nome,
    String email,
    String telefone
) {
}
```

### 5. Mapper (`backend.Model.Mapper.denunciaMapper`)
Mapeamento MapStruct:

```java
package backend.Model.Mapper;

import backend.Model.Dto.Record.denunciaRecord;
import backend.Model.Dto.denunciaDto;
import backend.Model.denuncia;
import backend.Repository.Entity.denunciaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface denunciaMapper {
    denuncia toModel(denunciaRecord denunciaRecord);
    denunciaEntity toEntity(denuncia denunciaModel);
    denunciaDto toDto(denuncia denunciaModel);
}
```

## Plano de Testes e Validação
1. Compilar o projeto (`mvn clean compile`) para garantir que os geradores do Lombok e MapStruct funcionem corretamente.
2. Garantir mapeamentos sem erros.
