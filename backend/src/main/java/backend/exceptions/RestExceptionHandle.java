package backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandle  {

    @ExceptionHandler(campoNuloException.class)
  public ResponseEntity<ErroResposta> handleCampoNulo(campoNuloException ex ) {
      ErroResposta erro = new ErroResposta(
        ex.getStatus(), ex.getMessage(), LocalDateTime.now()
      );
      return ResponseEntity.status(ex.getStatus()).body(erro);

  }
}
