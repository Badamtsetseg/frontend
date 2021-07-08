package mn.astvision.starter.repository;

import mn.astvision.starter.model.S3File;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author digz6
 */
@Repository
public interface S3FileRepository extends MongoRepository<S3File, String> {

    @Nullable
    S3File findTop1ByFileChecksum(String fileChecksum);

//    @Query("{'deleted': false, 'entity': 'exam-mathml', 'contentTypeSynced': null}")
//    List<S3File> findForContentTypeUpdate(Pageable pageable);

    List<S3File> findByEntity(String entity);
}
