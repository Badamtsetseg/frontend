package mn.astvision.starter.api.auth;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.model.auth.UserSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/user-enum")
public class UserEnumsApi {

    @GetMapping("source")
    public ResponseEntity<?> listSources() {
        return ResponseEntity.ok(UserSource.values());
    }
}
