package mn.astvision.starter.repository.mobile;

import mn.astvision.starter.model.mobile.PushNotificationResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author digz6
 */
@Repository
public interface PushNotificationResultRepository extends MongoRepository<PushNotificationResult, String> {
}
