package mn.astvision.starter.repository;

import mn.astvision.starter.model.Article;
import mn.astvision.starter.model.enums.ArticleType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author digz6
 */
@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {

    long countByType(ArticleType rype);

    List<Article> findByType(ArticleType type, Pageable pageable);
    List<Article> findAllByIdInAndDeletedFalse(List<String> ids);
    List<Article> findAllByDeleted(boolean deleted);
}
