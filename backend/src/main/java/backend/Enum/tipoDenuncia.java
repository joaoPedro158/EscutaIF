package backend.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum tipoDenuncia {
    ASSEDIO("Assédio"),
    DISCRIMINACAO("Discriminação"),
    VIOLENCIA("Violência"),
    CONDUTA_INAPROPRIADA("Conduta Inapropriada"),
    OUTRO("Outro");

    public final String to_string;
}
