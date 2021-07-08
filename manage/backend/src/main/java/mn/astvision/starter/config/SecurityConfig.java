package mn.astvision.starter.config;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.auth.filter.AuthenticationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * @author digz6
 */
@Slf4j
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("userDetailsService")
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public AuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
        AuthenticationTokenFilter authenticationTokenFilter = new AuthenticationTokenFilter();
        authenticationTokenFilter.setAuthenticationManager(authenticationManagerBean());
        return authenticationTokenFilter;
    }

    /*@Bean
    public AccessDeniedHandler accessDeniedHandler() {
        DigzAccessDeniedHandler accessDeniedHandler = new DigzAccessDeniedHandler();
        accessDeniedHandler.setErrorPage("/login");
        return accessDeniedHandler;
    }*/
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        log.info("Configuring auth manager...");
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        /*if (requireSsl) {
            httpSecurity = httpSecurity.requiresChannel().anyRequest().requiresSecure().and();
        }*/
        httpSecurity
                // @formatter:off
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll().and()
                //.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
                //.anyRequest().authenticated()
                .cors()
                .and()
                .csrf()
                .ignoringAntMatchers("/api/**").and();
        // @formatter:on

        httpSecurity.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000"
        ));
        configuration.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));

        // setAllowCredentials(true) is important, otherwise:
        // The value of the 'Access-Control-Allow-Origin' hea-der in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
        configuration.setAllowCredentials(true);

        // setAllowedHeaders is important! Without it, OPTIONS preflight request
        // will fail with 403 Invalid CORS request
        //configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
