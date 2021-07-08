package mn.astvision.starter.model.mobile;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mn.astvision.starter.model.BaseEntity;

@Data
@EqualsAndHashCode(callSuper = true)
public class DeviceToken extends BaseEntity {

    public static final String IOS = "ios";
    public static final String ANDROID = "android";
    public static final String MACOS = "macos";
    public static final String WINDOWS = "windows";
    public static final String WEB = "web";

    private String os; // ios, android
    private String token; // device token
    private String deviceId; // device id

    private String username;
    private String ip; // IP хаяг
}
