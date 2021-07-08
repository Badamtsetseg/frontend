package mn.astvision.starter.model.mobile;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mn.astvision.starter.model.BaseEntityWithUser;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class PushNotificationResult extends BaseEntityWithUser {

    private String pushNotificationId;

    private String os; // ios, android
    private String token; // device token
    private String deviceId; // device id

    private Boolean sendResult; // илгээсэн эсэх
    private String messageId; // firebase message id
    private String resultMessage; // илгээхэд гарсан алдааны мессеж
    private LocalDateTime sentDate; // илгээсэн огноо
}
