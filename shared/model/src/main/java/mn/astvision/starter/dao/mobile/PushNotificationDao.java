package mn.astvision.starter.dao.mobile;

import mn.astvision.starter.model.mobile.PushNotification;
import mn.astvision.starter.model.mobile.enums.PushNotificationReceiverType;
import mn.astvision.starter.model.mobile.enums.PushNotificationSendType;
import mn.astvision.starter.model.mobile.enums.PushNotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public class PushNotificationDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public long count(
            PushNotificationType type,
            PushNotificationSendType sendType,
            PushNotificationReceiverType receiverType,
            String receiver,
            Boolean sendResult,
            LocalDate sentDate1,
            LocalDate sentDate2
    ) {
        return mongoTemplate.count(buildQuery(type, sendType, receiverType, receiver, sendResult, sentDate1, sentDate2), PushNotification.class);
    }

    public List<PushNotification> list(
            PushNotificationType type,
            PushNotificationSendType sendType,
            PushNotificationReceiverType receiverType,
            String receiver,
            Boolean sendResult,
            LocalDate sentDate1,
            LocalDate sentDate2,
            PageRequest pageRequest
    ) {
        Query query = buildQuery(type, sendType, receiverType, receiver, sendResult, sentDate1, sentDate2);
        if (pageRequest == null) {
            query = query.with(PageRequest.of(0, 10, Sort.Direction.DESC, "id"));
        } else {
            query = query.with(pageRequest);
        }
        return mongoTemplate.find(query, PushNotification.class);
    }

    private Query buildQuery(
            PushNotificationType type,
            PushNotificationSendType sendType,
            PushNotificationReceiverType receiverType,
            String receiver,
            Boolean sendResult,
            LocalDate sentDate1,
            LocalDate sentDate2
    ) {
        Query query = new Query();

        if (type != null) {
            query.addCriteria(Criteria.where("type").is(type));
        }
        if (sendType != null) {
            query.addCriteria(Criteria.where("sendType").is(sendType));
        }
        if (receiverType != null) {
            query.addCriteria(Criteria.where("receiverType").is(receiverType));
        }
        if (!ObjectUtils.isEmpty(receiver)) {
            query.addCriteria(Criteria.where("receiver").regex(receiver, "i"));
        }
        if (sendResult != null) {
            query.addCriteria(Criteria.where("sendResult").is(sendResult));
        }
        if (sentDate1 != null && sentDate2 != null) {
            query.addCriteria(
                    new Criteria().andOperator(
                            Criteria.where("sentDate").gte(sentDate1.atTime(LocalTime.MIN)),
                            Criteria.where("sentDate").lte(sentDate2.atTime(LocalTime.MAX))
                    )
            );
        }

        return query;
    }

    public long countForCustomer(
            String username,
            PushNotificationType type,
            Boolean read
    ) {
        return mongoTemplate.count(buildQueryForCustomer(username, type, read), PushNotification.class);
    }

    public List<PushNotification> listForCustomer(
            String username,
            PushNotificationType type,
            Boolean read,
            PageRequest pageRequest
    ) {
        Query query = buildQueryForCustomer(username, type, read);
        if (pageRequest == null) {
            query = query.with(PageRequest.of(0, 10, Sort.Direction.DESC, "id"));
        } else {
            query = query.with(pageRequest);
        }
        return mongoTemplate.find(query, PushNotification.class);
    }

    private Query buildQueryForCustomer(
            String username,
            PushNotificationType type,
            Boolean read
    ) {
        Query query = new Query();
        query.addCriteria(Criteria.where("receiverType").is(PushNotificationReceiverType.USERNAME));
        query.addCriteria(Criteria.where("receiver").is(username.toLowerCase()));

        if (type != null) {
            query.addCriteria(Criteria.where("type").is(type));
        }

        if (read != null) {
            query.addCriteria(Criteria.where("read").is(read));
        }

        return query;
    }

    public void incCountSent(String id, int successCount, int failureCount) {
        mongoTemplate.updateMulti(
                new Query().addCriteria(Criteria.where("id").is(id)),
                new Update()
                        .inc("successCount", successCount)
                        .inc("failureCount", failureCount),
                PushNotification.class);
    }

    public void setCompleted(String id) {
        mongoTemplate.updateMulti(
                new Query().addCriteria(Criteria.where("id").is(id)),
                new Update()
                        .set("sendResult", "true")
                        .set("sentDate", LocalDateTime.now()),
                PushNotification.class);
    }
}
