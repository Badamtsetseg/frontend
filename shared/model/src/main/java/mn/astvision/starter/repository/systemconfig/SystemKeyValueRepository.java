package mn.astvision.starter.repository.systemconfig;

import mn.astvision.starter.model.systemconfig.SystemKeyValue;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

/**
 * @author MethoD
 */
@Repository
public interface SystemKeyValueRepository extends MongoRepository<SystemKeyValue, String> {

    @Nullable
    SystemKeyValue findByKey(String key);
}
