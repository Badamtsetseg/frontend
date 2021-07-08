package mn.astvision.starter.api.auth;

import com.mongodb.MongoException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.model.enums.ApplicationRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Locale;

/**
 * @author MethoD
 */
@Slf4j
@RestController
@RequestMapping("/api/application-role")
@Secured("ROLE_BUSINESS_ROLE_MANAGE")
public class ApplicationRoleApi {

    @Autowired
    private MessageSource messageSource;

    @GetMapping
    public ResponseEntity<?> list(Principal principal, Locale locale) {
//        log.info("List application role");
        try {
            return ResponseEntity.ok(ApplicationRole.values());
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }
}
