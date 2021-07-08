package mn.astvision.starter.dao;

import mn.astvision.starter.model.Article;
import mn.astvision.starter.model.enums.ArticleType;
import mn.astvision.starter.util.MongoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ArticleDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private MongoUtil mongoUtil;

    public long count(ArticleType type, String title, String authorId, Boolean hot, Boolean visible, Boolean deleted) {
        return mongoTemplate.count(buildPredicate(type, title, authorId, hot, visible, deleted, null, null), Article.class);
    }

    public Iterable<Article> list(ArticleType type, String title, String authorId, Boolean hot, Boolean visible,
                                  Boolean deleted, Pageable pageable, Sort sort) {
        return mongoTemplate.find(buildPredicate(type, title, authorId, hot, visible, deleted, pageable, sort), Article.class);
    }

    private Query buildPredicate(ArticleType type, String title, String authorId, Boolean hot, Boolean visible,
                                 Boolean deleted, Pageable pageable, Sort sort) {
        Query query = new Query();

        mongoUtil.queryIs(query, type, "type");
        mongoUtil.queryIs(query, authorId, "authorId");
        mongoUtil.queryIs(query, hot, "hot");
        mongoUtil.queryIs(query, visible, "visible");
        mongoUtil.queryRegex(query, title, "title");
        mongoUtil.queryDeleted(query, deleted);
        mongoUtil.queryPageable(query, pageable);
        if (sort != null) {
            query.with(sort);
        }

        return query;
    }
}
