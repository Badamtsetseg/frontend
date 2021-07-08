package mn.astvision.starter.google.firebase;

import com.google.firebase.messaging.*;
import mn.astvision.starter.model.mobile.enums.PushNotificationType;
import mn.astvision.starter.util.GlobalDateFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Map;

/**
 * @author MethoD
 */
@Service
public class FirebaseMessagingService {

    private static final Logger log = LoggerFactory.getLogger("firebaseLogger");

    private Message.Builder buildMessage(String registrationToken, PushNotificationType type, String title, String body, Map<String, String> data) {
        Message.Builder builder = Message.builder()
                .setToken(registrationToken)
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .putData("sound", "default")
                .putData("type", type.name())
                .putData("title", title)
                .putData("body", body)
                .putData("sentDate", GlobalDateFormat.DATE_TIME.format(LocalDateTime.now()));
        ;
        if (data != null) {
            builder.putAllData(data);
        }
        return builder;
    }

    private MulticastMessage.Builder buildMultiCastMessage(Collection<String> registrationTokens, PushNotificationType type, String title, String body, Map<String, String> data) {
        MulticastMessage.Builder builder = MulticastMessage.builder()
                .addAllTokens(registrationTokens)
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .putData("sound", "default")
                .putData("type", type.name())
                .putData("title", title)
                .putData("body", body)
                .putData("sentDate", GlobalDateFormat.DATE_TIME.format(LocalDateTime.now()));
        if (data != null) {
            builder.putAllData(data);
        }
        return builder;
    }

    private Message.Builder setAndroidConfig(
            Message.Builder builder,
            AndroidNotification.Priority priority,
            AndroidNotification.Visibility visibility,
            String title,
            String body) {
        AndroidNotification androidNotification = AndroidNotification.builder()
                .setTitle(title)
                .setBody(body)
                .setPriority(priority)
                .setVisibility(visibility)
                .build();

        AndroidConfig androidConfig = AndroidConfig.builder()
                .setPriority(AndroidConfig.Priority.NORMAL)
                .setNotification(androidNotification)
                .build();

        return builder.setAndroidConfig(androidConfig);
    }

    private Message.Builder setApnsConfig(Message.Builder builder) {
        Aps aps = Aps.builder()
                .setContentAvailable(true)
                .build();

        //ApnsFcmOptions apnsFcmOptions = ApnsFcmOptions.builder().build();
        ApnsConfig apnsConfig = ApnsConfig.builder()
                .setAps(aps)
                //.setFcmOptions(apnsFcmOptions)
                .build();

        return builder.setApnsConfig(apnsConfig);
    }

    private MulticastMessage.Builder setAndroidConfig(
            MulticastMessage.Builder builder,
            AndroidNotification.Priority priority,
            AndroidNotification.Visibility visibility,
            String title,
            String body) {
        AndroidNotification androidNotification = AndroidNotification.builder()
                .setTitle(title)
                .setBody(body)
                .setPriority(priority)
                .setVisibility(visibility)
                .build();

        AndroidConfig androidConfig = AndroidConfig.builder()
                .setPriority(AndroidConfig.Priority.NORMAL)
                .setNotification(androidNotification)
                .build();

        return builder.setAndroidConfig(androidConfig);
    }

    private MulticastMessage.Builder setApnsConfig(MulticastMessage.Builder builder) {
        Aps aps = Aps.builder()
                .setContentAvailable(true)
                .build();

        //ApnsFcmOptions apnsFcmOptions = ApnsFcmOptions.builder().build();
        ApnsConfig apnsConfig = ApnsConfig.builder()
                .setAps(aps)
                //.setFcmOptions(apnsFcmOptions)
                .build();

        return builder.setApnsConfig(apnsConfig);
    }

    public String send(
            String registrationToken,
            PushNotificationType type,
            String title,
            String body,
            Map<String, String> data) throws IllegalArgumentException, FirebaseMessagingException {
        Message.Builder builder = buildMessage(registrationToken, type, title, body, data);
        setAndroidConfig(builder, AndroidNotification.Priority.DEFAULT, AndroidNotification.Visibility.PUBLIC, title, body);
        setApnsConfig(builder);

        return FirebaseMessaging.getInstance().send(builder.build());
    }

    public BatchResponse sendMulti(
            Collection<String> registrationTokens,
            PushNotificationType type,
            String title,
            String body,
            Map<String, String> data) throws IllegalArgumentException, FirebaseMessagingException {
        MulticastMessage.Builder builder = buildMultiCastMessage(registrationTokens, type, title, body, data);
        setAndroidConfig(builder, AndroidNotification.Priority.DEFAULT, AndroidNotification.Visibility.PUBLIC, title, body);
        setApnsConfig(builder);

        return FirebaseMessaging.getInstance().sendMulticast(builder.build());
    }

    public String checkToken(String registrationToken) throws FirebaseMessagingException {
        Message.Builder builder = buildMessage(registrationToken, PushNotificationType.DEFAULT, "<title>", "<body", null);
        setAndroidConfig(builder, AndroidNotification.Priority.DEFAULT, AndroidNotification.Visibility.PUBLIC, "<title>", "<body");
        setApnsConfig(builder);

        return FirebaseMessaging.getInstance().send(builder.build(), true);
    }

    public BatchResponse checkTokenMulti(Collection<String> registrationTokens) throws FirebaseMessagingException {
        MulticastMessage.Builder builder = buildMultiCastMessage(registrationTokens, PushNotificationType.DEFAULT, "<title>", "<body", null);
        setAndroidConfig(builder, AndroidNotification.Priority.DEFAULT, AndroidNotification.Visibility.PUBLIC, "<title>", "<body");
        setApnsConfig(builder);

        return FirebaseMessaging.getInstance().sendMulticast(builder.build(), true);
    }
}
