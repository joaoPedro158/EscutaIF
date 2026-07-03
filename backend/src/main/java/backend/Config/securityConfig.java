package backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class securityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // 1. Desativa o CSRF, pois para APIs REST (Stateless) ele não é necessário
                .csrf(csrf -> csrf.disable())

                // 2. Garante que as configurações de CORS do seu WebConfiguration sejam obedecidas
                .cors(Customizer.withDefaults())

                // 3. Configura o gerenciamento de sessão como STATELESS (sem guardar estado no servidor)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 4. Regras de autorização das rotas
                .authorizeHttpRequests(authorize -> authorize
                        // Libera o POST especificamente para a rota do formulário
                        .requestMatchers(HttpMethod.POST, "/api/acolhimento/form").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/denuncias/form").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/adm/form").permitAll()

                        // Qualquer outra requisição (como a página de gráficos dos administradores) exigirá autenticação
                        .anyRequest().authenticated()
                )
                .build();
    }
}