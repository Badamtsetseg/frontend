package mn.astvision.starter.dao.mobile;

import mn.astvision.starter.model.mobile.DeviceToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Repository
public class DeviceTokenDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public long count(
            String os,
            String token,
            String deviceId,
            String username,
            String ip
    ) {
        return mongoTemplate.count(buildQuery(os, token, deviceId, username, ip), DeviceToken.class);
    }

    public List<DeviceToken> list(
            String os,
            String token,
            String deviceId,
            String username,
            String ip,
            PageRequest pageRequest
    ) {
        Query query = buildQuery(os, token, deviceId, username, ip);
        if (pageRequest == null) {
            query = query.with(PageRequest.of(0, 10, Sort.Direction.DESC, "id"));
        } else {
            query = query.with(pageRequest);
        }
        return mongoTemplate.find(query, DeviceToken.class);
    }

    public List<String> getTokensOnly(Pageable pageable) {
        Query query = new Query();
        query.fields().include("token");
        query = query.with(pageable);
        List<DeviceToken> deviceTokens = mongoTemplate.find(query, DeviceToken.class);

        List<java.lang.String> tokens = new ArrayList<>();
        for (DeviceToken deviceToken : deviceTokens) {
            tokens.add(deviceToken.getToken());
        }
        return tokens;
    }

    private Query buildQuery(
            String os,
            String token,
            String deviceId,
            String username,
            String ip
    ) {
        Query query = new Query();

        if (!StringUtils.isEmpty(os)) {
            query.addCriteria(Criteria.where("os").is(os));
        }
        if (!StringUtils.isEmpty(token)) {
            query.addCriteria(Criteria.where("token").is(token));
        }
        if (!StringUtils.isEmpty(deviceId)) {
            query.addCriteria(Criteria.where("deviceId").is(deviceId));
        }
        if (!StringUtils.isEmpty(username)) {
            query.addCriteria(Criteria.where("username").is(username));
        }
        if (!StringUtils.isEmpty(ip)) {
            query.addCriteria(Criteria.where("ip").is(ip));
        }

        return query;
    }
}
