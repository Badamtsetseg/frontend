package mn.astvision.starter.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@EqualsAndHashCode(callSuper = true)
public class Faq extends BaseEntityWithUser {

    @Indexed
    private String question;
    @Indexed
    private String answer;
    @Indexed
    private boolean visible = false;
    @Indexed
    private int order;
}
