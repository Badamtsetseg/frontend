package mn.astvision.starter.api.auth;

import com.mongodb.MongoException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.antd.AntdPagination;
import mn.astvision.starter.api.response.antd.AntdTableDataList;
import mn.astvision.starter.dao.auth.UserDao;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.model.auth.UserSource;
import mn.astvision.starter.repository.auth.UserRepository;
import mn.astvision.starter.service.EmailSenderService;
import mn.astvision.starter.service.EmailTemplateService;
import mn.astvision.starter.util.EmailAddressUtil;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

/**
 * @author MethoD
 */
@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserApi {

    private static final int REGISTRATION_CODE_DURATION_HOUR = 24; // 24 hours
    private static final int REGISTRATION_CODE_RESEND_DURATION = 3; // 3 minutes

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private EmailTemplateService emailTemplateService;

    @Autowired
    private MessageSource messageSource;

    @Secured({"ROLE_USER_VIEW", "ROLE_USER_MANAGE"})
    @GetMapping
    public ResponseEntity<?> list(String businessRole, UserSource source, Boolean active,
                                  String search, Boolean deleted, AntdPagination pagination, Locale locale) {
//        log.debug("List user > userFullName: " + userFullName + ", businessRole: " + businessRole + ", search: " + search + ", branchId: " + branchId + ", deleted: " + deleted + ", pagination: " + pagination);
        try {
            AntdTableDataList<User> listData = new AntdTableDataList<>();

            pagination.setTotal(userDao.count(businessRole, source, active, search, deleted));
            listData.setPagination(pagination);
            listData.setList(userDao.list(businessRole, source, active, search, deleted,
                    PageRequest.of(pagination.getCurrentPage(), pagination.getPageSize())));

//            log.debug("Total users: " + pagination.getTotal());
            return ResponseEntity.ok(listData);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @Secured({"ROLE_USER_VIEW", "ROLE_USER_MANAGE", "ROLE_ARTICLE_MANAGE", "ROLE_MANAGE_STORY"})
    @GetMapping("select")
    public ResponseEntity<?> select(String businessRole, String search, Boolean deleted, Locale locale) {
        try {
            return ResponseEntity.ok(userDao.list(businessRole, null, null, search, deleted, null));
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @Secured("ROLE_USER_MANAGE")
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody User createRequest, Locale locale, Principal principal) {
        log.debug("Create user: " + createRequest);
        try {
            if (userRepository.existsByUsernameAndDeletedFalse(createRequest.getUsername().toLowerCase()))
                return ResponseEntity.badRequest().body(messageSource.getMessage("username.exists", null, locale));

            User user = new User(createRequest.getUsername().toLowerCase(), passwordEncoder.encode(createRequest.getPassword()));
            user.setSource(UserSource.EMAIL);
            user.setEmail(createRequest.getEmail().toLowerCase());
            user.setBusinessRole(createRequest.getBusinessRole());
            user.setMobile(createRequest.getMobile());
            user.setLastName(createRequest.getLastName());
            user.setFirstName(createRequest.getFirstName());
            user.setAvatar(createRequest.getAvatar());

            user.setActive(createRequest.isActive());
            user.setCreatedBy(principal.getName());
            user.setCreatedDate(LocalDateTime.now());
            user = userRepository.save(user);

            return ResponseEntity.ok(user.getId());
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @Secured("ROLE_USER_MANAGE")
    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody User updateRequest, Locale locale, Principal principal) {
        log.debug("Update user: " + updateRequest);
        try {
            Optional<User> userOpt = userRepository.findById(updateRequest.getId());
            if (userOpt.isEmpty())
                return ResponseEntity.badRequest().body(messageSource.getMessage("data.notFound", null, locale));

            if (userRepository.existsByUsernameAndIdNotAndDeletedFalse(updateRequest.getUsername().toLowerCase(), updateRequest.getId()))
                return ResponseEntity.badRequest().body(messageSource.getMessage("username.exists", null, locale));

            User user = userOpt.get();
            user.setUsername(updateRequest.getUsername().toLowerCase());
            user.setEmail(updateRequest.getEmail().toLowerCase());
            if (!ObjectUtils.isEmpty(updateRequest.getPassword())) {
                user.setPassword(passwordEncoder.encode(updateRequest.getPassword()));
                user.setPasswordChangeDate(new Date());
            }
            user.setMobile(updateRequest.getMobile());
            user.setBusinessRole(updateRequest.getBusinessRole());
            user.setLastName(updateRequest.getLastName());
            user.setFirstName(updateRequest.getFirstName());
            user.setActive(updateRequest.isActive());
            user.setAvatar(updateRequest.getAvatar());

            user.setModifiedDate(LocalDateTime.now());
            user.setModifiedBy(principal.getName());

            userRepository.save(user);
            return ResponseEntity.ok(user.getId());
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @Secured("ROLE_USER_MANAGE")
    @DeleteMapping("delete")
    public ResponseEntity<?> delete(@RequestParam String id, Locale locale, Principal principal) {
        log.debug("Deleting user: " + id);
        try {
            Optional<User> userOpt = userRepository.findById(id);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(messageSource.getMessage("data.notFound", null, locale));
            }

            User user = userOpt.get();
            user.setDeleted(true);
            user.setOldUsername(user.getUsername());
            user.setUsername(user.getUsername() + "_" + user.getId());
            user.setOldEmail(user.getEmail());
            user.setEmail(null);
            user.setModifiedDate(LocalDateTime.now());
            user.setModifiedBy(principal.getName());

            userRepository.save(user);
            return ResponseEntity.ok(user.getId());
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @Secured({"ROLE_USER_VIEW", "ROLE_USER_MANAGE"})
    @GetMapping("resend-activation-email")
    public ResponseEntity<?> resendActivationEmail(String id, Locale locale) {
        try {
            User user = userRepository.findByIdAndDeletedFalse(id);
            if (user == null) {
                return ResponseEntity.badRequest().body("Хэрэглэгч олдсонгүй: " + id);
            }
            if (user.isActive()) {
                return ResponseEntity.badRequest().body("Хэрэглэгч идэвхтэй байна");
            }
            if (user.getActivationCodeResentDate() != null && user.getActivationCodeResentDate().plusMinutes(REGISTRATION_CODE_RESEND_DURATION).isAfter(LocalDateTime.now())) {
                return ResponseEntity.badRequest().body("Та " + REGISTRATION_CODE_RESEND_DURATION + " минут хүлээгээд дахин хүсэлт илгээнэ үү");
            }

            String activationCode = RandomStringUtils.randomAlphabetic(64);
            user.setActivationCode(activationCode);
            user.setActivationCodeGeneratedDate(LocalDateTime.now());
            user.setActivationCodeResentDate(LocalDateTime.now());
            userRepository.save(user);

            boolean result = emailSenderService.send(
                    "no-reply@astvision.mn",
                    "no-reply@astvision.mn",
                    user.getEmail(),
                    "astvision.mn - Бүртгэл баталгаажуулах",
                    emailTemplateService.getRegistrationEmail(
                            EmailAddressUtil.getActivateLink(user.getActivationCode()),
                            REGISTRATION_CODE_DURATION_HOUR,
                            EmailAddressUtil.getUnsubscribeLink(user.getEmail())
                    ),
                    null);
            if (!result) {
                log.error("Email send failed, deleting user: " + user.getUsername() + ", " + user.getEmail());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("И-мэйл илгээхэд амжилтгүй боллоо, та дараа дахин оролдоно уу");
            }

            return ResponseEntity.ok(user.getEmail() + " и-мэйл хаягруу баталгаажуулах код илгээлээ");
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }
}
