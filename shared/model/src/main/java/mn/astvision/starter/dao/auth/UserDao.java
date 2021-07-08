package mn.astvision.starter.dao.auth;

import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.model.auth.UserSource;
import mn.astvision.starter.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * @author MethoD
 */
@Repository
public class UserDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;

    public User get(String username) {
        User user = userRepository.findByUsernameAndDeletedFalse(username);
        if (user == null) {
            user = userRepository.findByEmailAndDeletedFalse(username);
        }
        return user;
    }

    public long count(String businessRole, UserSource source, Boolean active, String search, Boolean deleted) {
        return mongoTemplate.count(buildPredicate(businessRole, source, active, search, deleted, null), User.class);
    }

    public List<User> list(String businessRole, UserSource source, Boolean active, String search, Boolean deleted, Pageable pageable) {
        return mongoTemplate.find(buildPredicate(businessRole, source, active, search, deleted, pageable), User.class);
    }

    public List<String> listUserIds(String businessRole, String search) {
        List<String> userIds = new ArrayList<>();

        List<User> users = mongoTemplate.find(buildPredicateUserId(businessRole, search), User.class);
        for (User user : users) {
            userIds.add(user.getId());
        }

        return userIds;
    }

    private Query buildPredicate(String businessRole, UserSource source, Boolean active, String search, Boolean deleted, Pageable pageable) {
        Query query = new Query();

        if (!ObjectUtils.isEmpty(businessRole))
            query.addCriteria(Criteria.where("businessRole").is(businessRole));

        if (source != null)
            query.addCriteria(Criteria.where("source").is(source));

        if (active != null)
            query.addCriteria(Criteria.where("active").is(active));

        if (!ObjectUtils.isEmpty(search))
            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("email").regex(search, "i"),
                    Criteria.where("username").regex(search, "i"),
                    Criteria.where("lastName").regex(search, "i"),
                    Criteria.where("firstName").regex(search, "i")
            ));

        if (deleted != null)
            query.addCriteria(Criteria.where("deleted").is(deleted));

        if (pageable != null)
            query.with(pageable);

        return query;
    }

    private Query buildPredicateUserId(String businessRole, String search) {
        Query query = new Query();

        if (!ObjectUtils.isEmpty(businessRole))
            query.addCriteria(Criteria.where("businessRole").is(businessRole));

        if (!ObjectUtils.isEmpty(search))
            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("email").regex(search, "i"),
                    Criteria.where("username").regex(search, "i"),
                    Criteria.where("lastName").regex(search, "i"),
                    Criteria.where("firstName").regex(search, "i")
            ));

        query.addCriteria(Criteria.where("deleted").is(false));
        query.fields().include("id");

        return query;
    }
}
