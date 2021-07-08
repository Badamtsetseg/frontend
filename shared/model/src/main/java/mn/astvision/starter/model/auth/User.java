package mn.astvision.starter.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import mn.astvision.starter.model.BaseEntityWithUser;
import mn.astvision.starter.model.FileData;
import mn.astvision.starter.model.enums.ApplicationRole;
import mn.astvision.starter.util.GlobalDateFormat;
import org.springframework.data.annotation.Transient;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author MethoD
 */
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(Include.NON_NULL)
public class User extends BaseEntityWithUser {

    //@Indexed(unique = true)
    private String username;

    @JsonIgnore
    private String password;

    private String email;
    private String mobile;
    private String lastName;
    private String firstName;
    private Gender gender;
    private FileData avatar;

    private String businessRole; // DEVELOPER, ADMIN, CUSTOMER
    private boolean active;

    // firebase data
    private UserSource source; // EMAIL, FIREBASE
    private String externalId; // firebase uid

    private String deviceId; // сүүлд нэвтэрсэн төхөөрөмжийн ID
    private String appVersion; // сүүлд нэвтэрсэн мобайл аппын хувилбар

    @JsonIgnore
    private String activationCode; // бүртгэл баталгаажуулах код (token байдлаар ашиглана)
    @JsonIgnore
    private LocalDateTime activationCodeGeneratedDate; // бүртгэл баталгаажуулах код үүсгэсэн огноо
    @JsonIgnore
    private LocalDateTime activationCodeResentDate; // бүртгэл баталгаажуулах код дахин илгээсэн огноо
    @JsonIgnore
    private LocalDateTime activatedDate; // бүртгэл баталгаажуулсан огноо

    // TODO replace with LocalDateTime
    @JsonIgnore
    private Date passwordChangeDate;
    @JsonIgnore
    private String passwordResetCode; // нууц үг reset хийх код
    @JsonIgnore
    private LocalDateTime passwordResetCodeResentDate; // нууц үг reset хийх код дахин илгээсэн огноо
    @JsonIgnore
    private LocalDateTime passwordResetCodeGeneratedDate; // нууц үг reset хийх код үүсгэсэн огноо

    private String oldUsername; // хэрэглэгч устгасан тохиолдолд username-ийг нь энд оруулна
    private String oldEmail; // хэрэглэгч устгасан тохиолдолд email-ийг нь энд оруулна

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Transient
    private List<ApplicationRole> applicationRoles = new ArrayList<>();

    @Transient
    @JsonProperty("password")
    private String rawPassword; // API request-д зөвхөн ашиглана
    @Transient
    private String activateCode; // API request-д зөвхөн ашиглана

    @Transient
    public String getLoginName() {
        if (!ObjectUtils.isEmpty(username)) {
            return username;
        }
        if (!ObjectUtils.isEmpty(email)) {
            return email;
        }
        if (!ObjectUtils.isEmpty(externalId)) {
            return externalId;
        }

        return null;
    }

    @Transient
    public String getFullName() {
        StringBuilder sb = new StringBuilder();
        sb.append(firstName);
        if (!ObjectUtils.isEmpty(lastName)) {
            sb.append(" ").append(lastName);
        }
        return sb.toString();
    }

    @Transient
    public String getAvatarUrl() {
        return avatar != null ? avatar.getUrl() : null;
    }

    @Transient
    public String getActivatedDateText() {
        if (activatedDate != null) {
            return GlobalDateFormat.DATE_TIME_ONLY.format(activatedDate);
        } else {
            return null;
        }
    }
}
