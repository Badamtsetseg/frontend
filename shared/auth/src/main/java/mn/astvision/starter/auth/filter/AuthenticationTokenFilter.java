package mn.astvision.starter.auth.filter;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.auth.TokenUtil;
import mn.astvision.starter.dao.auth.UserDao;
import mn.astvision.starter.model.auth.BusinessRole;
import mn.astvision.starter.model.auth.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.ObjectUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

/**
 * @author Batulai
 */
@Slf4j
public class AuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {

    @Value("${token.header}")
    private String tokenHeader;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserDao userDao;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String authToken = httpRequest.getHeader(tokenHeader);

        if (!ObjectUtils.isEmpty(authToken)) {
            //log.debug("Handling auth token: " + authToken);
            boolean authResult = SecurityContextHolder.getContext().getAuthentication() != null;

            String username = tokenUtil.getUsernameFromToken(authToken);
            String deviceId = tokenUtil.getDeviceIdFromToken(authToken);
//            log.debug("Parsed username from token: " + username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    if (tokenUtil.validateToken(authToken)) {
                        User user = userDao.get(username);
                        if (user != null) {
                            if (user.getBusinessRole().equals(BusinessRole.CUSTOMER) && !Objects.equals(user.getDeviceId(), deviceId)) {
                                ((HttpServletResponse) response).setStatus(444);
                            } else {
                                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//                                log.debug("Got userDetails from token: " + userDetails);
//                                log.debug("Token valid, setting up auth: " + userDetails.getAuthorities());
                                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
                                SecurityContextHolder.getContext().setAuthentication(authentication);
                                authResult = true;
                            }
                        }
                    } else {
                        //LOGGER.debug("Token invalid");
                    }
                } catch (AuthenticationException e) {
                }
            }

//            log.debug("auth result: " + authResult);
            if (authResult) {
                chain.doFilter(request, response);
            } else {
                ((HttpServletResponse) response).setStatus(401);
            }
        } else {
            chain.doFilter(request, response);
        }
    }
}
