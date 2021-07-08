package mn.astvision.starter.datafiller;

import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.model.auth.UserSource;
import mn.astvision.starter.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * @author MethoD
 */
@Component
public class UserDataFiller {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    private void fill() {
        if (userRepository.count() == 0) {
            User userDev = new User("dev@astvision.mn", passwordEncoder.encode("dev123"));
            userDev.setSource(UserSource.EMAIL);
            userDev.setBusinessRole("DEVELOPER");
            userDev.setActive(true);
            userDev.setLastName("Astvision");
            userDev.setFirstName("Developer");
            userRepository.save(userDev);

            User userAdmin = new User("admin@astvision.mn", passwordEncoder.encode("admin123"));
            userDev.setSource(UserSource.EMAIL);
            userAdmin.setBusinessRole("ADMIN");
            userAdmin.setActive(true);
            userAdmin.setLastName("Astvision");
            userAdmin.setFirstName("Admin");
            userRepository.save(userAdmin);

            User user = new User("user@astvision.mn", passwordEncoder.encode("user123"));
            userDev.setSource(UserSource.EMAIL);
            user.setBusinessRole("CUSTOMER");
            user.setActive(true);
            user.setLastName("Astvision");
            user.setFirstName("User");
            userRepository.save(user);
        }
    }
}
