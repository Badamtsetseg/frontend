package mn.astvision.starter.api;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.DeleteRequest;
import mn.astvision.starter.api.request.antd.AntdPagination;
import mn.astvision.starter.api.response.antd.AntdTableDataList;
import mn.astvision.starter.dao.ArticleDao;
import mn.astvision.starter.model.Article;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.model.enums.ArticleType;
import mn.astvision.starter.repository.ArticleRepository;
import mn.astvision.starter.repository.auth.UserRepository;
import mn.astvision.starter.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@Slf4j
@Secured("ROLE_ARTICLE_MANAGE")
@RestController
@RequestMapping("/api/article")
public class ArticleApi {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleDao articleDAO;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> list(ArticleType type, String title, String authorId, Boolean hot, Boolean visible, Boolean deleted, AntdPagination pagination) {
        AntdTableDataList<Article> listData = new AntdTableDataList<>();

        pagination.setTotal(articleDAO.count(type, title, authorId, hot, visible, deleted));
        listData.setPagination(pagination);
        listData.setList(articleService.list(type, title, authorId, hot, visible, deleted, pagination.toPageRequest(), null));
        return ResponseEntity.ok(listData);
    }

    @GetMapping("{id}")
    public ResponseEntity<Article> get(@PathVariable String id) {
        return ResponseEntity.ok().body(articleRepository.findById(id).orElse(null));
    }

    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody Article updateRequest, Principal principal) {
        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хандах эрхгүй байна");

        Article article;
        if (ObjectUtils.isEmpty(updateRequest.getId())) {
            article = new Article();
            article.setCreatedBy(user.getId());
            article.setCreatedDate(LocalDateTime.now());
        } else {
            article = articleRepository.findById(updateRequest.getId()).orElse(null);
            if (article == null)
                return ResponseEntity.badRequest().body("Нийтлэл олдсонгүй: " + updateRequest.getId());
            article.setModifiedBy(user.getId());
            article.setModifiedDate(LocalDateTime.now());
        }

        if (ObjectUtils.isEmpty(updateRequest.getTitle()))
            return ResponseEntity.badRequest().body("Гарчиг хоосон байна");

        article.setType(updateRequest.getType());
        article.setTitle(updateRequest.getTitle());
        article.setShortContent(updateRequest.getShortContent());
        article.setContent(updateRequest.getContent());
        article.setAuthorId(updateRequest.getAuthorId());
        article.setHot(updateRequest.isHot());
        article.setVisible(updateRequest.isVisible());
        article.setPremium(updateRequest.isPremium());
        article.setCover(updateRequest.getCover());
        article = articleRepository.save(article);
        return ResponseEntity.ok(article);
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> delete(@RequestBody DeleteRequest deleteRequest, Principal principal) {
        if (ObjectUtils.isEmpty(deleteRequest.getId()))
            return ResponseEntity.badRequest().body("ID хоосон байна");

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хандах эрхгүй байна");

        try {
            Article article = articleRepository.findById(deleteRequest.getId()).orElse(null);
            if (article == null)
                return ResponseEntity.badRequest().body("Нийтлэл олдсонгүй: " + deleteRequest.getId());

            article.setDeleted(true);
            article.setModifiedBy(user.getId());
            article.setModifiedDate(LocalDateTime.now());
            articleRepository.save(article);

            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
