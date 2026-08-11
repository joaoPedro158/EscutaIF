package backend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class regraNegocioException extends RuntimeException{
    private HttpStatus status;

    public regraNegocioException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
