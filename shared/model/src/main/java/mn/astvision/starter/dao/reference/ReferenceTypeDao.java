package mn.astvision.starter.dao.reference;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.model.reference.ReferenceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

@Slf4j
@Repository
public class ReferenceTypeDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public long count(String description, String name, Boolean deleted) {
        return mongoTemplate.count(buildQuery(description, name, deleted), ReferenceType.class);
    }

    public Iterable<ReferenceType> list(String description, String name, Boolean deleted, Pageable pageable) {
        Query query = buildQuery(description, name, deleted);
        if (pageable != null) {
            query = query.with(pageable);
        }
        return mongoTemplate.find(query, ReferenceType.class);
    }

    private Query buildQuery(String description, String name, Boolean deleted) {
        log.debug("predicate: description: " + description + ", name: " + name + ", deleted: " + deleted);
        Query query = new Query();


        if (!ObjectUtils.isEmpty(name))
            query.addCriteria(Criteria.where("name").regex(name, "i"));

        if (!ObjectUtils.isEmpty(description))
            query.addCriteria(Criteria.where("description").regex(description, "i"));

        if (deleted != null) {
            query.addCriteria(Criteria.where("deleted").is(deleted));
        } else
            query.addCriteria(Criteria.where("deleted").is(false));


        return query;
    }
}

