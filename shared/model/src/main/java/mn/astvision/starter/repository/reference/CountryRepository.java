package mn.astvision.starter.repository.reference;

import mn.astvision.starter.model.reference.Country;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Tergel
 */
@Repository
public interface CountryRepository extends MongoRepository<Country, String> {

    boolean existsByCodeAndDeletedFalse(String code);
    Country findByCodeAndDeletedFalse(String code);
}
