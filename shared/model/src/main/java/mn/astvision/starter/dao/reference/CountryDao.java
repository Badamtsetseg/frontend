package mn.astvision.starter.dao.reference;

import mn.astvision.starter.model.reference.Country;
import mn.astvision.starter.util.MongoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class CountryDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private MongoUtil mongoUtil;

    public long count(String code, String name, Boolean university, Boolean scholarship, Boolean deleted) {
        return mongoTemplate.count(buildPredicate(code, name, university, scholarship, deleted, null), Country.class);
    }

    public Iterable<Country> list(String code, String name, Boolean university, Boolean scholarship, Boolean deleted, Pageable pageable) {
        return mongoTemplate.find(buildPredicate(code, name, university, scholarship, deleted, pageable), Country.class);
    }

    public Iterable<Country> select(Boolean university, Boolean scholarship) {
        Query query = new Query();

        mongoUtil.queryIs(query, university, "university");
        mongoUtil.queryIs(query, scholarship, "scholarship");
        query.with(Sort.by(Sort.Direction.ASC, "order"));

        return mongoTemplate.find(query, Country.class);
    }

    private Query buildPredicate(String code, String name, Boolean university, Boolean scholarship, Boolean deleted, Pageable pageable) {
        Query query = new Query();

        mongoUtil.queryRegex(query, code, "code");
        mongoUtil.queryRegex(query, name, "name");
        mongoUtil.queryIs(query, university, "university");
        mongoUtil.queryIs(query, scholarship, "scholarship");
        mongoUtil.queryDeleted(query, deleted);
        mongoUtil.queryPageable(query, pageable);

        return query;
    }
}
