package mn.astvision.starter.auth;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;
import java.util.Base64;

// import javax.crypto.spec.SecretKeySpec;

@Slf4j
public class TokenUtilTest {

    @Test
    public void testGenerateKey() {
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
        log.info("encoded -> " + encodedKey);

        byte[] decodedKey = Base64.getDecoder().decode(encodedKey);
        SecretKey parsedKey = Keys.hmacShaKeyFor(decodedKey);
        // SecretKey parsedKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HS512"); // works fine too
        log.info("decoded -> " + parsedKey);
        log.info("decoded string -> " + Base64.getEncoder().encodeToString(parsedKey.getEncoded()));
    }
}
