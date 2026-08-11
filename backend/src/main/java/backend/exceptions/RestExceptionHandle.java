package backend.exceptions;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestExceptionHandle  {

    @ExceptionHandler(campoNuloException.class)
  public ResponseEntity<ErroResposta> handleCampoNulo(campoNuloException ex ) {
      ErroResposta erro = new ErroResposta(
        ex.getStatus(), ex.getMessage(), LocalDateTime.now()
      );
      return ResponseEntity.status(ex.getStatus()).body(erro);

  }

    @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<ErroResposta> handleEnumInvalido(HttpMessageNotReadableException ex ) {

        String mensagem = "Valor inválido no corpo da requisição";

        if (ex.getCause() instanceof InvalidFormatException invalidFormat) {
            if (invalidFormat.getTargetType().isEnum()) {

                String valoresAceitos = Arrays.stream(invalidFormat.getTargetType().getEnumConstants())
                        .map(Object::toString)
                        .collect(Collectors.joining(", "));

                String campo = invalidFormat.getPathReference()
                        .replaceAll("[\"\\[\\]]", "")
                        .replaceAll(".*\\.", "");

                mensagem = String.format(
                        "Valor '%s' inválido para o campo '%s'. Valores aceitos: [%s]",
                        invalidFormat.getValue(),
                        campo,
                        valoresAceitos
                );
            }
        }
        ErroResposta erro = new ErroResposta(
                HttpStatus.BAD_REQUEST, mensagem, LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResposta> handleValidacao(MethodArgumentNotValidException ex) {
        String mensagem = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(field -> field.getField() + ": " + field.getDefaultMessage())
                .collect(Collectors.joining(", "));

        ErroResposta erro = new ErroResposta(
                HttpStatus.BAD_REQUEST, mensagem, LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    @ExceptionHandler(regraNegocioException.class)
    public ResponseEntity<ErroResposta> tratarRegraNegocio(regraNegocioException ex){
        ErroResposta erro = new ErroResposta(ex.getStatus(), ex.getMessage(), LocalDateTime.now());

        return ResponseEntity.status(ex.getStatus()).body(erro);
    }

    // Captura erros de validação disparados pelo @Validated nos @RequestParam
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErroResposta> handleConstraintViolation(ConstraintViolationException ex) {
        String mensagem = ex.getMessage();

        ErroResposta erro = new ErroResposta(
                HttpStatus.BAD_REQUEST, mensagem, LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErroResposta> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String mensagem = ex.getMessage();

        ErroResposta erro = new ErroResposta(
                HttpStatus.BAD_REQUEST, mensagem, LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }
}
