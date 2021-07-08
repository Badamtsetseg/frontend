package mn.astvision.starter.api.request.auth;

import lombok.Data;

/**
 * @author MethoD
 */
@Data
public class LoginRequest {

    private String username;
    private String oldPassword;
    private String password;

    private String deviceId;
    private String appVersion;
}
