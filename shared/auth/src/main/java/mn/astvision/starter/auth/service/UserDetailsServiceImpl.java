package mn.astvision.starter.auth.service;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.dao.auth.UserDao;
import mn.astvision.starter.model.auth.BusinessRole;
import mn.astvision.starter.repository.auth.BusinessRoleRepository;
import mn.astvision.starter.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author digz6
 */
@Slf4j
@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDao userDao;

    @Autowired
    private BusinessRoleRepository businessRoleRepository;

    @Override
    public UserDetails loadUserByUsername(final String username) throws AuthenticationException {
        mn.astvision.starter.model.auth.User user = userDao.get(username.toLowerCase());
        if (user == null) {
//            log.debug("loading user by external id: " + username);
            user = userRepository.findByExternalIdAndDeletedFalse(username);
        }

//        log.debug("loaded user -> " + user);
        if (user != null) {
            if (user.isActive()) {
                List<GrantedAuthority> authorities = buildUserAuthority(user.getBusinessRole());
                return buildUserForAuthentication(user, authorities);
            } else {
                throw new DisabledException("Disabled account: " + username);
            }
        } else {
            throw new UsernameNotFoundException("User not found: " + username);
        }
    }

    private User buildUserForAuthentication(mn.astvision.starter.model.auth.User user, List<GrantedAuthority> authorities) {
//        log.debug("building user auth: " + user.getLoginName());
        return new User(user.getLoginName(), user.getPassword(), user.isActive(), true, true, true, authorities);
    }

    private List<GrantedAuthority> buildUserAuthority(String businessRole) {
        List<GrantedAuthority> authList = new ArrayList<>();

        Optional<BusinessRole> businessRoleOpt = businessRoleRepository.findById(businessRole);
        if (businessRoleOpt.isPresent()) {
            BusinessRole _brole = businessRoleOpt.get();
            if (_brole.getApplicationRoles() != null) {
                _brole.getApplicationRoles().forEach((applicationRole) -> {
//                    log.debug("building auth: " + applicationRole);
                    authList.add(new SimpleGrantedAuthority(applicationRole.name()));
                });
            }
        }

        return authList;
    }

    /*private List<GrantedAuthority> buildUserAuthority(Collection<UserRole> userRoles) {
        List<GrantedAuthority> authList = new ArrayList<>();
        for (UserRole userRole : userRoles) {
            authList.add(new SimpleGrantedAuthority(userRole.getId().getRole()));
        }
        return authList;
    }*/
}
