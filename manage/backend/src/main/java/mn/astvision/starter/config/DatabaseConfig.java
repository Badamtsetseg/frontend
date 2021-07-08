package mn.astvision.starter.config;

import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

/**
 * @author MethoD
 */
@Configuration
public class DatabaseConfig {

    @Primary
    @Bean
    @ConfigurationProperties(prefix = "primary.mongodb")
    public MongoProperties getPrimary() {
        return new MongoProperties();
    }

    @Primary
    @Bean(name = "mongoTemplate")
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(getPrimary().getUri()));
    }
}
