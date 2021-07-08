package mn.astvision.starter.google.firebase;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @author MethoD
 */
@Service
public class FirebaseAuthService {

    private static final Logger log = LoggerFactory.getLogger("firebaseLogger");

    public FirebaseToken verifyToken(String idToken) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }
}
