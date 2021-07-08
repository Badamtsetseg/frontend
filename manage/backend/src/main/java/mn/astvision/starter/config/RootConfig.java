package mn.astvision.starter.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

/**
 * @author MethoD
 */
@Slf4j
@Configuration
public class RootConfig {

    @Bean
    public MessageSource messageSource() {
        log.info("Configuring message source...");
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:/messages/messages");
        messageSource.setCacheSeconds(0);
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
