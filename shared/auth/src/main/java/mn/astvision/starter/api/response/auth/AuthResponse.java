package mn.astvision.starter.api.response.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mn.astvision.starter.model.auth.BusinessRole;

/**
 * @author MethoD
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String userId; // хэрэглэгчийн ID
    private String fullName; // харуулах нэр
    private String email; // мэйл хаяг
    private String avatar; // профайл зурагны URL

    /*
    нэмэлт дата
     */
    private String username;
    private String token;
    private BusinessRole businessRole;
}
