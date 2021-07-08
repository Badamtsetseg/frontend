package mn.astvision.starter.service.auth;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.repository.auth.BusinessRoleRepository;
import mn.astvision.starter.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.util.Optional;

@Slf4j
@Component
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusinessRoleRepository businessRoleRepository;

    public User get(String username, boolean withRole) {
        User user = userRepository.findByUsernameAndDeletedFalse(username);
        if (user != null && !ObjectUtils.isEmpty(user.getBusinessRole()) && withRole) {
            businessRoleRepository.findById(user.getBusinessRole()).ifPresent(businessRole -> {
                user.setApplicationRoles(businessRole.getApplicationRoles());
            });
        }

        return user;
    }

    public String getFullNameById(String id) {
        if (id == null) {
            return null;
        }

        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return (user.getLastName() != null ? (user.getLastName() + " ") : "") + (user.getFirstName() != null ? user.getFirstName().toUpperCase() : "");
        }

        return null;
    }

    public User getByUsername(String username) {
        User user = userRepository.findByUsernameAndDeletedFalse(username);
        if (user != null) {
            fillRelatedData(user);
        }
        return user;
    }

    private void fillRelatedData(User user) {
//        if (user.getBusinessRole() != null) {
//            Optional<BusinessRole> optBusinessRole = businessRoleRepository.findById(user.getBusinessRole());
//            optBusinessRole.ifPresent(businessRole -> user.setBusinessRoleName(businessRole.getName()));
//        }
    }
}
