package mn.astvision.starter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@Slf4j
public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        log.info("Starting servlet app ...");
        return application.sources(BootApplication.class);
    }
}
