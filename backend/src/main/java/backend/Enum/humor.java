package backend.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum humor {
    MUITO_TRISTE("Muito Triste"),
    TRISTE("Triste"),
    NEUTRO("Neutro"),
    FELIZ("Feliz"),
    MUITO_FELIZ("Muito Feliz");

    private final String humor;
}
