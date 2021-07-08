package mn.astvision.starter.model.auth;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mn.astvision.starter.model.BaseEntity;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserLoginHistory extends BaseEntity {

    private String userId;
    private String deviceId; // device id
    private String ip; // IP хаяг
}
