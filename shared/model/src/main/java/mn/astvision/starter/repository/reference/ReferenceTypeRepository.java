package mn.astvision.starter.repository.reference;

import mn.astvision.starter.model.reference.ReferenceType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReferenceTypeRepository extends MongoRepository<ReferenceType, String> {

    boolean existsByCodeAndDeletedFalse(String code);

    boolean existsByIdAndDeletedFalse(String id);

    boolean existsByNameAndDeletedFalse(String name);

    boolean existsByNameAndIdNotAndDeletedFalse(String name, String id);

    @Nullable
    ReferenceType findByCodeAndDeletedFalse(String code);

    Optional<ReferenceType> findByCode(String code);
}
