package mn.astvision.starter.repository.email;

import mn.astvision.starter.model.email.EmailUnsubscribe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author digz6666
 */
@Repository
public interface EmailUnsubscribeRepository extends MongoRepository<EmailUnsubscribe, String> {

    boolean existsByEmail(String email);
}
