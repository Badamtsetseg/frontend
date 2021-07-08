package mn.astvision.starter.repository;

import mn.astvision.starter.model.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author naba
 */
@Repository
public interface LocationRepository extends MongoRepository<Location, String> {

    @Nullable
    Location findByLocationId(Integer locationId);

    List<Location> findByLocationIdIsIn(List<Integer> locationIds);

    List<Location> findByParentIdAndDeletedFalse(Integer parentId);

    Optional<Location> findByNameMnAndParentIdAndDeletedFalse(String nameMn, Integer parentId);
}
