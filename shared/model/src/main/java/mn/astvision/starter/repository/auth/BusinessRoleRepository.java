package mn.astvision.starter.repository.auth;

import mn.astvision.starter.model.auth.BusinessRole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author digz6
 */
@Repository
public interface BusinessRoleRepository extends MongoRepository<BusinessRole, String> {
}
