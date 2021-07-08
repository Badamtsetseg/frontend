package mn.astvision.starter.repository;

import mn.astvision.starter.model.Email;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author digz6
 */
@Repository
public interface EmailRepository extends MongoRepository<Email, String> {
}
