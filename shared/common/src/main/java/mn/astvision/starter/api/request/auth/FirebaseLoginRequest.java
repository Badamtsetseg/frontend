package mn.astvision.starter.api.request.auth;

import lombok.Data;

@Data
public class FirebaseLoginRequest {

    private String idToken;

    private String deviceId;
    private String appVersion;
}
