package mn.astvision.starter.datafiller;

import mn.astvision.starter.model.auth.BusinessRole;
import mn.astvision.starter.model.enums.ApplicationRole;
import mn.astvision.starter.repository.auth.BusinessRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author MethoD
 */
@Component
public class BusinessRoleDataFiller {

    @Autowired
    private BusinessRoleRepository businessRoleRepository;

    @PostConstruct
    private void fill() {
        if (businessRoleRepository.count() == 0) {
            BusinessRole businessRoleDeveloper = new BusinessRole("DEVELOPER");
            businessRoleDeveloper.setApplicationRoles(Arrays.asList(ApplicationRole.values()));
            businessRoleDeveloper.setName("Хөгжүүлэгч");
            businessRoleRepository.save(businessRoleDeveloper);

            BusinessRole businessRoleAdmin = new BusinessRole("ADMIN");
            List<ApplicationRole> appRoles = new ArrayList<>(Arrays.asList(ApplicationRole.getDefaultRoles()));
            appRoles.add(ApplicationRole.ROLE_MANAGE_DEFAULT);
            appRoles.add(ApplicationRole.ROLE_USER_MANAGE);
            businessRoleAdmin.setApplicationRoles(appRoles);
            businessRoleAdmin.setName("Админ");
            businessRoleRepository.save(businessRoleAdmin);

            BusinessRole businessRoleCustomer = new BusinessRole("CUSTOMER");
            businessRoleCustomer.setApplicationRoles(List.of(ApplicationRole.ROLE_CUSTOMER));
            businessRoleCustomer.setName("Хэрэглэгч");
            businessRoleRepository.save(businessRoleCustomer);
        }

        String articleAdmin = "ARTICLE_ADMIN";
        if (!businessRoleRepository.existsById(articleAdmin)) {
            BusinessRole businessRoleAdmin = new BusinessRole(articleAdmin);
            List<ApplicationRole> appRoles = new ArrayList<>(Arrays.asList(ApplicationRole.getDefaultRoles()));
            appRoles.add(ApplicationRole.ROLE_ARTICLE_MANAGE);
            businessRoleAdmin.setApplicationRoles(appRoles);
            businessRoleAdmin.setName("Админ (Зөвлөгөө)");
            businessRoleRepository.save(businessRoleAdmin);
        }
    }
}
