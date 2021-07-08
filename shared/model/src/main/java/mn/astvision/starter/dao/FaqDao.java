package mn.astvision.starter.dao;

import mn.astvision.starter.model.Faq;
import mn.astvision.starter.util.MongoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class FaqDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private MongoUtil mongoUtil;

    public long count(String question, String answer, Boolean visible, Boolean deleted) {
        return mongoTemplate.count(buildPredicate(question, answer, visible, deleted, null), Faq.class);
    }

    public Iterable<Faq> list(String question, String answer, Boolean visible, Boolean deleted, Pageable pageable) {
        return mongoTemplate.find(buildPredicate(question, answer, visible, deleted, pageable), Faq.class);
    }

    private Query buildPredicate(String question, String answer, Boolean visible, Boolean deleted, Pageable pageable) {
        Query query = new Query();

        mongoUtil.queryRegex(query, question, "question");
        mongoUtil.queryRegex(query, answer, "answer");
        mongoUtil.queryIs(query, visible, "visible");
        mongoUtil.queryDeleted(query, deleted);
        mongoUtil.queryPageable(query, pageable);

        return query;
    }
}
