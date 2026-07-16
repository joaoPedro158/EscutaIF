package backend.Config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableMethodSecurity
public class securityConfig {

    private final securityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/adm/form").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/adm/login/form").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/acolhimento/form").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/denuncias/form").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/dashboard/**").authenticated()
                        .requestMatchers("/error").permitAll()
              
                        // 2. Todo o restante das rotas (como os gráficos) exigirão o Token JWT
                        .anyRequest().authenticated()
                )
                // O PULO DO GATO: Executa o seu filtro customizado de JWT antes do padrão do Spring
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}