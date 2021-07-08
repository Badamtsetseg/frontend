package mn.astvision.starter.api.auth;

import com.mongodb.MongoException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.auth.LoginRequest;
import mn.astvision.starter.api.request.auth.PasswordResetRequest;
import mn.astvision.starter.model.auth.BusinessRole;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.repository.auth.BusinessRoleRepository;
import mn.astvision.starter.repository.auth.UserRepository;
import mn.astvision.starter.service.EmailSenderService;
import mn.astvision.starter.service.EmailTemplateService;
import mn.astvision.starter.util.EmailAddressUtil;
import mn.astvision.starter.api.response.auth.AuthResponse;
import mn.astvision.starter.auth.PasswordUtil;
import mn.astvision.starter.auth.TokenUtil;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;

/**
 * @author digz6
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthApi {

    private static final int RESET_CODE_DURATION = 30;
    private static final int RESET_CODE_RESEND_DURATION = 3;

    @Value("${token.header}")
    private String tokenHeader;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    private PasswordUtil passwordUtil;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusinessRoleRepository businessRoleRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private EmailTemplateService emailTemplateService;

    @PostMapping("login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest loginRequest,
            Locale locale) {
        log.debug("Login request: " + loginRequest.getUsername());

        try {
            User user = userRepository.findByUsernameAndDeletedFalse(loginRequest.getUsername());
            if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("login.usernameOrPasswordWrong", null, locale));
            }
            if (!user.isActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("login.accountDisabled", null, locale));
            }

            Optional<BusinessRole> businessRoleOpt = businessRoleRepository.findById(user.getBusinessRole());
            if (businessRoleOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("error.permission", null, locale));
            }

            AuthResponse authResponse = new AuthResponse();
            authResponse.setUserId(user.getId());
            authResponse.setUsername(user.getUsername());
            authResponse.setFullName(user.getFullName());
            authResponse.setEmail(user.getEmail());
            authResponse.setAvatar(null); // TODO
            authResponse.setToken(tokenUtil.generateToken(user.getUsername(), user.getDeviceId()));
            authResponse.setBusinessRole(businessRoleOpt.get());

            return ResponseEntity.ok(authResponse);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        } catch (NullPointerException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.app", null, locale));
        }
    }

    @GetMapping("check-token")
    public ResponseEntity<?> checkToken(String token) {
        // log.debug("token: " + token);
        String username = tokenUtil.getUsernameFromToken(token);
        Date expirationDate = tokenUtil.getExpirationDateFromToken(token);
//        log.debug("expirationDate: " + expirationDate);
        if (expirationDate == null || expirationDate.before(new Date())) {
            return ResponseEntity.badRequest().body("Токен хүчингүй байна");
        }

        User user = userRepository.findByUsernameAndDeletedFalse(username);
        if (user == null) {
            return ResponseEntity.badRequest().body("Токен хүчингүй байна");
        }

        String deviceId = tokenUtil.getDeviceIdFromToken(token);
        if (!Objects.equals(user.getDeviceId(), deviceId)) {
            return ResponseEntity.badRequest().body("Та өөр төхөөрөмж дээр нэвтэрсэн байна");
        }

        return ResponseEntity.ok(true);
    }

    @GetMapping("refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, Locale locale) {
        String token = request.getHeader(tokenHeader);
        if (ObjectUtils.isEmpty(token)) {
            return ResponseEntity.badRequest().body("Токен хоосон байна");
        }

        String username = tokenUtil.getUsernameFromToken(token);
        try {
            User user = userRepository.findByUsernameAndDeletedFalse(username);
            if (user == null || !user.isActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хэрэглэгчийн мэдээлэл олдсонгүй");
            }
            if (!tokenUtil.canTokenBeRefreshed(token, user.getPasswordChangeDate())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Токен хүчингүй байна");
            }

            Optional<BusinessRole> businessRoleOpt = businessRoleRepository.findById(user.getBusinessRole());
            if (businessRoleOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хэрэглэгчийн эрхийн төрөл олдсонгүй");
            }

            AuthResponse authResponse = new AuthResponse();
            authResponse.setToken(tokenUtil.refreshToken(token));
            authResponse.setBusinessRole(businessRoleOpt.get());

            return ResponseEntity.ok(authResponse);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @PostMapping("reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest resetRequest, Locale locale) {
        if (ObjectUtils.isEmpty(resetRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Нэвтрэх нэр хоосон байна");
        }

        try {
            User user = userRepository.findByUsernameAndDeletedFalse(resetRequest.getUsername());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хэрэглэгчийн мэдээлэл олдсонгүй");
            }
            if (!user.isActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("error.permission", null, locale));
            }
            if (user.getPasswordResetCodeResentDate() != null && user.getPasswordResetCodeResentDate().plusMinutes(RESET_CODE_RESEND_DURATION).isAfter(LocalDateTime.now())) {
                return ResponseEntity.badRequest().body("Та " + RESET_CODE_RESEND_DURATION + " минут хүлээгээд дахин и-мэйл илгээнэ үү");
            }

            String passwordResetCode = RandomStringUtils.random(6, true, true);

            boolean result = emailSenderService.send(
                    "no-reply@astvision.mn",
                    "no-reply@astvision.mn",
                    user.getEmail(),
                    "astvision.mn - Нууц үг сэргээх",
                    emailTemplateService.getPasswordReset(
                            passwordResetCode,
                            RESET_CODE_DURATION,
                            EmailAddressUtil.getUnsubscribeLink(user.getEmail())
                    ),
                    null);
            if (!result) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("И-мэйл явуулахад алдаа гарлаа");
            }

            user.setPasswordResetCode(passwordResetCode);
            user.setPasswordResetCodeGeneratedDate(LocalDateTime.now());
            user.setPasswordResetCodeResentDate(LocalDateTime.now());
            userRepository.save(user);

            return ResponseEntity.ok("И-мэйл илгээлээ");
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @PostMapping("set-password")
    public ResponseEntity<?> setPassword(@RequestBody PasswordResetRequest resetRequest, Locale locale) {
        try {
            User user = userRepository.findByUsernameAndDeletedFalse(resetRequest.getUsername());
            if (user == null || !user.isActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("error.permission", null, locale));
            }

            if (!Objects.equals(user.getPasswordResetCode(), resetRequest.getResetCode())
                    || user.getPasswordResetCodeGeneratedDate() == null
                    || user.getPasswordResetCodeGeneratedDate().plusMinutes(RESET_CODE_DURATION).isBefore(LocalDateTime.now())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Сэргээх код буруу байна");
            }

            if (!passwordUtil.isValid(resetRequest.getPassword())) {
                return ResponseEntity.badRequest().body("Нууц үг шаардлага хангахгүй байна, 8-30 тэмдэгтийн урттай ба ядаж нэг том үсэг, жижиг үсэг, тоо болон тусгай тэмдэгт агуулсан байна");
            }

            user.setPassword(passwordEncoder.encode(resetRequest.getPassword()));
            user.setPasswordChangeDate(new Date());
            user.setPasswordResetCode(null);
            userRepository.save(user);

            return ResponseEntity.ok(true);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }
}
