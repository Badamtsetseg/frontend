package mn.astvision.starter.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author MethoD
 */
@Document
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class BaseEntityWithUser extends BaseEntity {

    @CreatedBy
    @JsonIgnore
    private String createdBy;

    @LastModifiedBy
    @JsonIgnore
    private String modifiedBy;

    @Transient
    private String createdUser;

    @Transient
    private String modifiedUser;
}
