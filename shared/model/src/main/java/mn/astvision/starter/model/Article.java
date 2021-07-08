package mn.astvision.starter.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mn.astvision.starter.model.enums.ArticleType;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

/**
 * Нийтлэл
 *
 * @author MethoD
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class Article extends BaseEntityWithUser {

    @Indexed
    private ArticleType type;
    @Indexed
    private String title;
    private String shortContent; // товч мэдээлэл
    private String content;
    @Indexed
    private String authorId; // Нийтэлсэн хэрэглэгчийн ID -> User
    @Indexed
    private boolean hot = false;
    private boolean premium; // төлбөртэй content эсэх
    @Indexed
    private boolean visible; // Харагдах эсэх

    private FileData cover;
    private List<FileData> coverList;

    private int viewCount = 0;

    @Transient
    public String getCoverUrl() {
        return cover != null ? cover.getUrl() : null;
    }

    @Transient
    private String authorName;

    @Transient
    private String authorAvatarUrl;
}
