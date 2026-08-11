package backend.exceptions;


import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public record ErroResposta(
        HttpStatus status,
        String mensagem,
        LocalDateTime dataHora
) {
}
