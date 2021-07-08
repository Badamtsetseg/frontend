package mn.astvision.starter;

import lombok.extern.slf4j.Slf4j;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

@Ignore
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class PasswordEncoderTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testEncode() {
        log.info(passwordEncoder.encode("test123"));
    }
}
