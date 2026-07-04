package backend.Config;

import backend.Repository.admJpaRepository;
import backend.Service.tokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@AllArgsConstructor
public class securityFilter extends OncePerRequestFilter {

    private final tokenService tokenService;
    private final admJpaRepository repository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = recuperarToken(request);

        if (token != null) {
            String email = tokenService.validarToken(token);

            if (email != null) {
                // Busca o administrador no banco para confirmar a existência dele
                var admin = repository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

                // Cria o objeto de autenticação oficial do Spring Security (sem mapear roles complexas por enquanto)
                var authentication = new UsernamePasswordAuthenticationToken(admin, null, java.util.Collections.emptyList());

                // Salva essa autenticação no contexto do Spring para essa requisição específica
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // Continua mandando a requisição para frente na esteira do Spring
        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.replace("Bearer ", ""); // Remove a palavra 'Bearer ' e deixa só a hash
    }
}
