package mn.astvision.starter.api.request.auth;

import lombok.Data;

/**
 * @author MethoD
 */
@Data
public class PasswordResetRequest {

    private String username;
    private String password;
    private String resetCode;
}
