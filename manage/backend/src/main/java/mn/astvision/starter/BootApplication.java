package mn.astvision.starter;

//import co.elastic.apm.attach.ElasticApmAttacher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Needed for mvn spring-boot:run
 *
 * @author MethoD
 */
@SpringBootApplication
public class BootApplication {

    public static void main(String[] args) {
        // don't need to attach when mvn spring-boot:run
        //ElasticApmAttacher.attach();
        SpringApplication.run(BootApplication.class, args);
    }
}
