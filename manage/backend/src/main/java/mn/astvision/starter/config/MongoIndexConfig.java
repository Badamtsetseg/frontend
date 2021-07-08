package mn.astvision.starter.config;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.dto.IndexDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * @author MethoD
 */
@Slf4j
@Configuration
@DependsOn("mongoTemplate")
public class MongoIndexConfig {

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostConstruct
    public void initIndexes() {
        List<IndexDto> indexDefs = new ArrayList<>();

        // systemCron
//        indexDefs.add(new IndexDto("systemCron", "cronType"));

        // deviceToken
        indexDefs.add(new IndexDto("deviceToken", "username"));
        indexDefs.add(new IndexDto("deviceToken", "deviceId"));
        indexDefs.add(new IndexDto("deviceToken", "ip"));

        // payment
        indexDefs.add(new IndexDto("payment", "number", true));
        indexDefs.add(new IndexDto("payment", "couponApproved"));
        indexDefs.add(new IndexDto("payment", "couponId"));
        indexDefs.add(new IndexDto("payment", "methodType"));
        indexDefs.add(new IndexDto("payment", "externalOrderId"));
        indexDefs.add(new IndexDto("payment", "userId"));
        indexDefs.add(new IndexDto("payment", "status"));
        indexDefs.add(new IndexDto("payment", "discountedAmount"));
        indexDefs.add(new IndexDto("payment", "initiateResponseDate"));
        indexDefs.add(new IndexDto("payment", "deleted"));
        addGenericIndexes("payment", indexDefs);

        // referenceData
        indexDefs.add(new IndexDto("referenceData", "name"));
        indexDefs.add(new IndexDto("referenceData", "order"));
        indexDefs.add(new IndexDto("referenceData", "typeCode"));
        indexDefs.add(new IndexDto("referenceData", "deleted"));

        // referenceType
        indexDefs.add(new IndexDto("referenceType", "active"));
        indexDefs.add(new IndexDto("referenceType", "code", true));
        indexDefs.add(new IndexDto("referenceType", "deleted"));

        // s3File
//        indexDefs.add(new IndexDto("s3File", "contentTypeSynced"));
        indexDefs.add(new IndexDto("s3File", "entity"));
        indexDefs.add(new IndexDto("s3File", "fileName"));
        indexDefs.add(new IndexDto("s3File", "fileSize"));
        indexDefs.add(new IndexDto("s3File", "deleted"));
        addGenericIndexes("s3File", indexDefs);
        addGenericUserIndexes("s3File", indexDefs);

        // systemKeyValue
        indexDefs.add(new IndexDto("systemKeyValue", "key"));

        // user
        indexDefs.add(new IndexDto("user", "active"));
        indexDefs.add(new IndexDto("user", "activationCode"));
        indexDefs.add(new IndexDto("user", "businessRole"));
        indexDefs.add(new IndexDto("user", "firstName"));
        indexDefs.add(new IndexDto("user", "lastName"));
        indexDefs.add(new IndexDto("user", "username", true));
        indexDefs.add(new IndexDto("user", "email"));
        indexDefs.add(new IndexDto("user", "externalId"));
        indexDefs.add(new IndexDto("user", "premium"));
        indexDefs.add(new IndexDto("user", "source"));
//        indexDefs.add(new IndexDto("user", "deleted"));
        addGenericIndexes("user", indexDefs);

        try {
            for (IndexDto indexDto : indexDefs) {
                Index index = new Index()
                        .on(indexDto.getField(), Sort.Direction.ASC)
                        .named(indexDto.getCollection() + "_" + indexDto.getField());
                if (indexDto.isUnique()) {
                    index = index.unique();
                }
                mongoTemplate.indexOps(indexDto.getCollection()).ensureIndex(index);
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    private void addGenericIndexes(String collection, List<IndexDto> indexDefs) {
        String[] genericFields = new String[]{
                "createdDate",
                "modifiedDate"
        };
        for (String genericField : genericFields) {
            indexDefs.add(new IndexDto(collection, genericField));
        }
    }

    private void addGenericUserIndexes(String collection, List<IndexDto> indexDefs) {
        String[] genericFields = new String[]{
                "createdBy",
                "modifiedBy"
        };
        for (String genericField : genericFields) {
            indexDefs.add(new IndexDto(collection, genericField));
        }
    }
}
