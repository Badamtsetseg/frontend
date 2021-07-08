package mn.astvision.starter.google.firebase;

import com.google.api.client.util.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;

/**
 * @author MethoD
 */
@Service
public class FirebaseAppService {

    private static final Logger log = LoggerFactory.getLogger("firebaseLogger");

    private static final String CREDENTIAL_FILE_LOCATION = "/firebase.json";

    @Value("{firebase.dbUrl}")
    private String firebaseDbUrl;

    @PostConstruct
    public void initialize() {
        log.info("Initializing firebase messaging service...");
        try {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(FirebaseAppService.class.getResourceAsStream(CREDENTIAL_FILE_LOCATION)))
                    .setDatabaseUrl(firebaseDbUrl)
                    .build();

            FirebaseApp.initializeApp(options);
            log.info("Initialized firebase messaging service.");
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
