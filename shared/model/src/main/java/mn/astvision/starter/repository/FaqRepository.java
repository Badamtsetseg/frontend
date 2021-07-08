package mn.astvision.starter.repository;

import mn.astvision.starter.model.Faq;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Tergel
 */
@Repository
public interface FaqRepository extends MongoRepository<Faq, String> {
}
