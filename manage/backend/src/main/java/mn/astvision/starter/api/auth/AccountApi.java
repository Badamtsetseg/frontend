package mn.astvision.starter.api.auth;

import com.mongodb.MongoException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.auth.LoginRequest;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.Locale;

/**
 * @author digz6
 */
@Slf4j
@RestController
@RequestMapping("/api/account")
@Secured("ROLE_MANAGE_DEFAULT")
public class AccountApi {

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("profile")
    public ResponseEntity<?> getProfile(Principal principal, Locale locale) {
        try {
            User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хэрэглэгчийн мэдээлэл олдсонгүй");
            }
            if (!user.isActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("error.permission", null, locale));
            }

            return ResponseEntity.ok(user);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @PostMapping("profile")
    public ResponseEntity<?> updateProfile(
            @RequestBody User updateRequest,
            Principal principal,
            Locale locale) {
        try {
            User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
            if (user == null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хэрэглэгчийн мэдээлэл олдсонгүй");

            if (!user.isActive())
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("error.permission", null, locale));

            user.setAvatar(updateRequest.getAvatar());
            user.setMobile(updateRequest.getMobile());
            user.setEmail(updateRequest.getEmail());
            user.setLastName(updateRequest.getLastName());
            user.setFirstName(updateRequest.getFirstName());
            user.setGender(updateRequest.getGender());

            userRepository.save(user);

            return ResponseEntity.ok(true);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @PostMapping("change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody LoginRequest changePasswordRequest,
            Principal principal,
            Locale locale) {
        try {
            User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
            if (user == null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хэрэглэгчийн мэдээлэл олдсонгүй");

            if (!user.isActive())
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("error.permission", null, locale));

            if (!passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword()))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(messageSource.getMessage("profile.oldPasswordWrong", null, locale));

            user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
            user.setPasswordChangeDate(new Date());
            userRepository.save(user);

            return ResponseEntity.ok(true);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }
}
