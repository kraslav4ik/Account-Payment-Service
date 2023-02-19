package account.configuration;

import account.entities.Role;
import account.services.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public AuthenticationEntryPoint getEntryPointHandler() {
        return new CustomAuthenticationEntryPoint();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }
    @Bean
    public AccessDeniedHandler getAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration corsConfig = new CorsConfiguration().applyPermitDefaultValues();
//        corsConfig.setAllowCredentials(true);
//        source.registerCorsConfiguration("/**", corsConfig);
//        return source;
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.httpBasic()
                // AuthEntryPoint
                .authenticationEntryPoint(this.getEntryPointHandler())
                //ExceptionHandler
                .and()
                .exceptionHandling().accessDeniedHandler(this.getAccessDeniedHandler())
                // Request with matchers
                .and()
                .authorizeRequests()
                .mvcMatchers("/api/acct/payments").hasAnyRole(Role.ACCOUNTANT.name())
                .mvcMatchers("/api/empl/payment").hasAnyRole(Role.USER.name(), Role.ACCOUNTANT.name())
                .mvcMatchers("/api/auth/changepass").authenticated()
                .mvcMatchers("/api/auth/signout").authenticated()
//                .mvcMatchers("/api/auth/login").authenticated()
                .mvcMatchers("/api/auth/verifyJWT").authenticated()
                .mvcMatchers("/api/security/events").hasAnyRole(Role.AUDITOR.name())
                .mvcMatchers("/api/auth/signup").permitAll()
                .mvcMatchers("/api/auth/login").permitAll()
                .mvcMatchers("/actuator/**").permitAll()
                .anyRequest().hasAnyRole(Role.ADMIN.name())
                // Enabling CORS, disabling csrf
                .and()
                .cors()
                .and().csrf().disable().headers().frameOptions().disable()
                // Session management
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // Filter to validate JWS tokens
                .and()
                .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

