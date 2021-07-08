package mn.astvision.starter.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author MethoD
 */
@Slf4j
@Component
public class TokenUtil {

    @Value("${token.secret}")
    private String secret;

    @Value("${token.expiration}")
    private Long expiration;

    @Autowired
    private UserRepository userRepository;

    private SecretKey secretKey;

    @PostConstruct
    public void initSecretKey() {
        secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String getUsernameFromToken(String token) {
        String username = null;
        Claims claims = getClaimsFromToken(token);
        //log.debug("Got claims from token: " + claims);
        if (claims != null) {
            username = claims.getSubject();
        }
        return username;
    }

    public Date getCreatedDateFromToken(String token) {
        Date created = null;
        Claims claims = getClaimsFromToken(token);
        if (claims != null) {
            created = new Date((Long) claims.get("created"));
        }
        return created;
    }

    public Date getExpirationDateFromToken(String token) {
        Date expirationDate = null;
        Claims claims = getClaimsFromToken(token);
        if (claims != null) {
            expirationDate = claims.getExpiration();
        }
        return expirationDate;
    }

    public String getDeviceIdFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        if (claims != null && claims.get("audience") != null) {
            return claims.get("audience").toString();
        }
        return null;
    }

    public Boolean canTokenBeRefreshed(String token, Date lastPasswordReset) {
        final Date created = getCreatedDateFromToken(token);
        return !(isCreatedBeforeLastPasswordReset(created, lastPasswordReset)) &&
                (
                        !(isTokenExpired(token))
//                                || ignoreTokenExpiration(token)
                );
    }

    public String refreshToken(String token) {
        String refreshedToken = null;
        Claims claims = getClaimsFromToken(token);
        if (claims != null) {
            claims.put("created", new Date());
            refreshedToken = generateToken(claims);
        }
        return refreshedToken;
    }

    public Boolean validateToken(String token) {
        String username = getUsernameFromToken(token);
        Date created = getCreatedDateFromToken(token);

//        log.debug("got " + username + " from " + token);
        User user = userRepository.findByUsernameAndDeletedFalse(username);
        if (user == null) {
//            log.info("loading by external id");
            user = userRepository.findByExternalIdAndDeletedFalse(username);
        }
        return user != null
                && username.equals(user.getLoginName())
                && !(isTokenExpired(token))
                && !(isCreatedBeforeLastPasswordReset(created, user.getPasswordChangeDate()));
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims = null;
        if (!ObjectUtils.isEmpty(token)) {
            try {
                claims = Jwts.parserBuilder()
                        .setSigningKey(secretKey)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
            } catch (ExpiredJwtException | MalformedJwtException | SecurityException | UnsupportedJwtException | IllegalArgumentException e) {
                log.error(e.getMessage());
            }
        }
        return claims;
    }

    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + expiration * 1000);
    }

    private Boolean isTokenExpired(String token) {
        Date expirationdDate = getExpirationDateFromToken(token);
        return expirationdDate.before(new Date());
    }

    private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
        return lastPasswordReset != null && created.before(lastPasswordReset);
    }

    public String generateToken(String username, String deviceId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", username);
        claims.put("audience", deviceId);
        claims.put("created", new Date());
        return generateToken(claims);
    }

    private String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }
}
