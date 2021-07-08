package mn.astvision.starter.model.mobile;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mn.astvision.starter.model.mobile.enums.PushNotificationType;
import mn.astvision.starter.model.BaseEntityWithUser;
import mn.astvision.starter.model.mobile.enums.PushNotificationReceiverType;
import mn.astvision.starter.model.mobile.enums.PushNotificationSendType;
import mn.astvision.starter.util.GlobalDateFormat;
import org.springframework.data.annotation.Transient;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class PushNotification extends BaseEntityWithUser {

    public static final int PRIORITY_HIGH = 100;
    public static final int PRIORITY_NORMAL = 50;
    public static final int PRIORITY_LOW = 0;

    private PushNotificationType type; // DEFAULT, SERVICE, PAYMENT, NEWS, EMERGENCY
    private String title; // гарчиг
    private String body; // агуулга
    private Map<String, String> data;
    private int priority;

    private PushNotificationSendType sendType; // DIRECT, CRON
    private LocalDateTime scheduledDate;
    private PushNotificationReceiverType receiverType; // USERNAME, TOKEN, ALL
    private String receiver; // username or token

    private Boolean sendResult; // илгээсэн эсэх
    private int successCount;
    private int failureCount;
    private String resultMessage; // илгээхэд гарсан алдааны мессеж
    private LocalDateTime sentDate; // илгээсэн огноо

    private boolean read; // уншсан эсэх

    @Transient
    public String getSentDateStr() {
        if (sentDate != null) {
            return GlobalDateFormat.DATE_TIME_ONLY.format(sentDate);
        } else {
            return null;
        }
    }
}
