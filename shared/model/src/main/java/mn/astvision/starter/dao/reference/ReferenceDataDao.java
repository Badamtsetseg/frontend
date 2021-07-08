package mn.astvision.starter.dao.reference;

import mn.astvision.starter.model.reference.ReferenceData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

@Repository
public class ReferenceDataDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public long count(String typeCode, String description, Integer order, String name) {
        return mongoTemplate.count(buildQuery(typeCode, description, order, name), ReferenceData.class);
    }

    public Iterable<ReferenceData> list(String typeCode, String description, Integer order, String name, Pageable pageable) {
        Query query = buildQuery(typeCode, description, order, name);
        if (pageable != null) {
            query = query.with(pageable);
        }
        return mongoTemplate.find(query, ReferenceData.class);
    }

    private Query buildQuery(String typeCode, String description, Integer order, String name) {
        Query query = new Query();

        if (!ObjectUtils.isEmpty(typeCode)) {
            query.addCriteria(Criteria.where("typeCode").is(typeCode));
        }

        if (!ObjectUtils.isEmpty(name)) {
            query.addCriteria(Criteria.where("name").regex(name, "i"));
        }

        if (!ObjectUtils.isEmpty(description)) {
            query.addCriteria(Criteria.where("description").regex(description, "i"));
        }

        query.addCriteria(Criteria.where("deleted").is(false));

        return query;
    }
}
