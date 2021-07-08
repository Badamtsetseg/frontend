package mn.astvision.starter.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

//import java.util.List;
import java.util.Locale;

/**
 * @author MethoD
 */
@Slf4j
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

//    @Override
//    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
//        log.info("Adding argument resolvers...");
//    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                //.allowedOrigins("http://localhost:3000", "http://localhost:8000")
                //.allowedHeaders("*")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .maxAge(3600);
    }

    @Bean
    public LocaleResolver localeResolver() {
        log.info("Configuring locale resolver...");
        // locale comes from Accept-Language header
        AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
        localeResolver.setDefaultLocale(new Locale("mn"));
        return localeResolver;
    }
}
