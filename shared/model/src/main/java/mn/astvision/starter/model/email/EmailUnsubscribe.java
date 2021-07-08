package mn.astvision.starter.model.email;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mn.astvision.starter.model.BaseEntity;

@Data
@EqualsAndHashCode(callSuper = true)
public class EmailUnsubscribe extends BaseEntity {

    private String email;
    private boolean active;
}
