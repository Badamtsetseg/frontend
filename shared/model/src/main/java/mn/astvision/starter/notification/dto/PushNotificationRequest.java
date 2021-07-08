package mn.astvision.starter.notification.dto;

import lombok.Data;

import java.util.List;

/**
 * @author MethoD
 */
@Data
public class PushNotificationRequest {

    private String registrationToken;
    private List<String> registrationTokens;
    private String title;
    private String body;
}
