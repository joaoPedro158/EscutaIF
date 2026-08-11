package backend.Enum;

import backend.exceptions.regraNegocioException;
import org.springframework.http.HttpStatus;

public enum statusDenuncia {
    PENDENTE {
        @Override
        public statusDenuncia proximo() {
            return EM_ANALISE;
        }
    },
    EM_ANALISE {
        @Override
        public statusDenuncia proximo() {
            return CONCLUIDA;
        }
    },
    CONCLUIDA {
        @Override
        public statusDenuncia proximo() {
            return ARQUIVADA;
        }
    },
    ARQUIVADA {
        @Override
        public statusDenuncia proximo() {

            throw new regraNegocioException("Esta denúncia já está arquivada e atingiu o estágio final.", HttpStatus.BAD_REQUEST);
        }
    };

    public abstract statusDenuncia proximo();
}