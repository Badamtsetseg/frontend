package mn.astvision.starter.repository.auth;

import mn.astvision.starter.model.auth.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

/**
 * @author digz6
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    boolean existsByUsernameAndDeletedFalse(String username);

    boolean existsByEmailAndDeletedFalse(String username);

    boolean existsByEmailAndActiveTrueAndDeletedFalse(String username);

    boolean existsByUsernameAndIdNotAndDeletedFalse(String username, String id);

    long deleteByUsername(String username); // for testing

    @Nullable
    User findByIdAndDeletedFalse(String id);

    @Nullable
    User findByUsernameAndDeletedFalse(String username);

    @Nullable
    User findByEmailAndDeletedFalse(String email);

    @Nullable
    User findByEmailAndBusinessRoleAndDeletedFalse(String email, String businessRole);

    @Nullable
    User findByExternalIdAndDeletedFalse(String externalId);

    @Nullable
    User findByActivationCodeAndDeletedFalse(String code);
}
