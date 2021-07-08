package mn.astvision.starter.service;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.repository.ArticleRepository;
import mn.astvision.starter.repository.auth.UserRepository;
import mn.astvision.starter.dao.ArticleDao;
import mn.astvision.starter.model.Article;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.model.enums.ArticleType;
import mn.astvision.starter.util.CustomAggregationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

/**
 * @author Tergel on 4/11/21
 */
@Slf4j
@Component
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleDao articleDAO;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private CustomAggregationUtil customAggregationUtil;

    public Iterable<Article> list(ArticleType type, String title, String authorId, Boolean hot, Boolean visible, Boolean deleted, Pageable pageable, Sort sort) {
        Iterable<Article> articles = articleDAO.list(type, title, authorId, hot, visible, deleted, pageable, sort);
        for (Article article : articles)
            fillRelatedData(article);
        return articles;
    }

    public Article get(String id) {
        Optional<Article> articleOpt = articleRepository.findById(id);
        if (articleOpt.isPresent()) {
            Article article = articleOpt.get();
            fillRelatedData(article);
            return article;
        } else {
            return null;
        }
    }

    private void fillRelatedData(Article article) {
        try {
            if (!ObjectUtils.isEmpty(article.getAuthorId())) {
                Optional<User> userOpt = userRepository.findById(article.getAuthorId());
                if (userOpt.isPresent()) {
                    article.setAuthorName(userOpt.get().getFirstName());
                    article.setAuthorAvatarUrl(userOpt.get().getAvatarUrl());
                }
            }
        } catch (Exception e) {
            log.error("fill author data error: " + e.getMessage());
        }
    }

    public List<Article> search(ArticleType type, String param) {
        try {
            List<AggregationOperation> aggOperations = new ArrayList<>();
            aggOperations.add(Aggregation.match(Criteria.where("type").is(type)));
            aggOperations.add(Aggregation.match(Criteria.where("deleted").is(false)));
            aggOperations.add(customAggregationUtil.convertObjectId("userId", "authorId"));
            aggOperations.add(Aggregation.lookup("user", "userId", "_id", "user"));
            if (!ObjectUtils.isEmpty(param))
                aggOperations.add(Aggregation.match(
                        new Criteria().orOperator(
                                Criteria.where("title").regex(param, "i"),
                                Criteria.where("shortContent").regex(param, "i"),
                                Criteria.where("content").regex(param, "i"),
                                Criteria.where("user.firstName").regex(param, "i")
                        )
                ));

            Aggregation selectAggregation = newAggregation(aggOperations);
            AggregationResults<Article> getAll = mongoTemplate.aggregate(selectAggregation, Article.class, Article.class);
            List<Article> articles = getAll.getMappedResults();
            for (Article article : articles)
                fillRelatedData(article);

            return articles;
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return new ArrayList<>();
    }
}
