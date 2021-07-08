package mn.astvision.starter.api.auth;

import com.mongodb.MongoException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.DeleteRequest;
import mn.astvision.starter.api.request.antd.AntdPagination;
import mn.astvision.starter.api.response.antd.AntdTableDataList;
import mn.astvision.starter.dao.auth.BusinessRoleDao;
import mn.astvision.starter.model.auth.BusinessRole;
import mn.astvision.starter.model.enums.ApplicationRole;
import mn.astvision.starter.repository.auth.BusinessRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Optional;

/**
 * @author MethoD
 */
@Slf4j
@RestController
@RequestMapping("/api/business-role")
public class BusinessRoleApi {

    @Autowired
    private BusinessRoleRepository businessRoleRepository;

    @Autowired
    private BusinessRoleDao businessRoleDao;

    @Autowired
    private MessageSource messageSource;

    @GetMapping
    @Secured({"ROLE_BUSINESS_ROLE_MANAGE", "ROLE_USER_VIEW", "ROLE_USER_MANAGE"})
    public ResponseEntity<?> list(String role, ApplicationRole applicationRole, AntdPagination pagination, Locale locale) {
//        log.debug("List business role > role: " + role + ", applicationRoles: " + applicationRoles + ", pagination: " + pagination);
        try {
            AntdTableDataList<BusinessRole> listData = new AntdTableDataList<>();

            pagination.setTotal(businessRoleDao.count(role, applicationRole));
            listData.setPagination(pagination);
            listData.setList(businessRoleDao.list(role, applicationRole,
                    PageRequest.of(pagination.getCurrentPage(), pagination.getPageSize())));

//            log.debug("Total business roles: " + pagination.getTotal());
            return ResponseEntity.ok(listData);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @GetMapping("select")
    @Secured({"ROLE_BUSINESS_ROLE_MANAGE", "ROLE_USER_VIEW", "ROLE_USER_MANAGE"})
    public ResponseEntity<?> select(String role, ApplicationRole applicationRole, Locale locale) {
//        log.debug("Select business role > role: " + role + ", applicationRoles: " + applicationRoles);
        try {
            return ResponseEntity.ok(businessRoleDao.list(role, applicationRole, null));
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @PostMapping("create")
    @Secured("ROLE_BUSINESS_ROLE_MANAGE")
    public ResponseEntity<?> create(@RequestBody BusinessRole createRequest, Locale locale) {
        log.debug("Create business role: " + createRequest.getRole());
        try {
            if (businessRoleRepository.existsById(createRequest.getRole())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageSource.getMessage("data.exists", null, locale));
            }

            BusinessRole businessRole = new BusinessRole();
            businessRole.setRole(createRequest.getRole());
            businessRole.setName(createRequest.getName());
            businessRole.setApplicationRoles(createRequest.getApplicationRoles());
            businessRoleRepository.save(businessRole);

            return ResponseEntity.ok(true);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @PutMapping("update")
    @Secured("ROLE_BUSINESS_ROLE_MANAGE")
    public ResponseEntity<?> update(@RequestBody BusinessRole updateRequest, Locale locale) {
        log.debug("Update business role: " + updateRequest);
        try {
            Optional<BusinessRole> businessRoleOpt = businessRoleRepository.findById(updateRequest.getKey());
            if (businessRoleOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageSource.getMessage("data.notFound", null, locale));
            }

            BusinessRole businessRole = businessRoleOpt.get();
            businessRole.setName(updateRequest.getName());
            businessRole.setApplicationRoles(updateRequest.getApplicationRoles());
            businessRoleRepository.save(businessRole);

            return ResponseEntity.ok(true);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }

    @DeleteMapping("delete")
    @Secured("ROLE_BUSINESS_ROLE_MANAGE")
    public ResponseEntity<?> deleteMulti(@RequestBody DeleteRequest deleteRequest, Locale locale) {
        log.debug("Deleting business roles: " + deleteRequest);
        try {
            if (ObjectUtils.isEmpty(deleteRequest.getId()))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageSource.getMessage("error.invalidRequest", null, locale));

            BusinessRole businessRole = businessRoleRepository.findById(deleteRequest.getId()).orElse(null);
            if (businessRole == null)
                return ResponseEntity.badRequest().body("Цахим ажлын байр олдсонгүй: " + deleteRequest.getId());

            businessRoleRepository.deleteById(deleteRequest.getId());
            return ResponseEntity.ok(true);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(messageSource.getMessage("error.database", null, locale));
        }
    }
}
