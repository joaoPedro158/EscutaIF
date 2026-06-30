package backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import tools.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.databind.JsonMappingException;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


import org.springframework.http.converter.HttpMessageNotReadableException;
import java.util.Arrays;
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

                // pega os valores aceitos pelo enum
                String valoresAceitos = Arrays.stream(invalidFormat.getTargetType().getEnumConstants())
                        .map(Object::toString)
                        .collect(Collectors.joining(", "));

                // pega o campo que veio errado
                String campo = invalidFormat.getPathReference()
                        .replaceAll("[\"\\[\\]]", "")  // remove aspas e colchetes
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
}
