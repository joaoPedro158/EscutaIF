package backend.exceptions;

import org.springframework.http.HttpStatus;

public class campoNuloException extends RuntimeException{

    private final HttpStatus status;
    public campoNuloException(String mensagem){
        super(mensagem);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
