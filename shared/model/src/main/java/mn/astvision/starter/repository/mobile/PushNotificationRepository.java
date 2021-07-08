package mn.astvision.starter.repository.mobile;

import mn.astvision.starter.model.mobile.PushNotification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author digz6
 */
@Repository
public interface PushNotificationRepository extends MongoRepository<PushNotification, String> {

    @Nullable
    PushNotification findByIdAndReceiver(String id, String receiver);

    @Query("{'sendType': 'CRON', 'sendResult': null, 'scheduledDate': {$lt: ?0}}")
    List<PushNotification> findForSend(LocalDateTime date, Pageable pageable);
}
