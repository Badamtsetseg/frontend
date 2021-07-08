package mn.astvision.starter.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * @author MethoD
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class Email extends BaseEntityWithUser {

    private String from;
    private String name;
    private String to;
    private String subject;
    private String content;
    private String comment;

    private boolean result;
    private LocalDateTime sentDate;
    private String errorMessage;
    private boolean queueSend; // if true > try to send later
}
