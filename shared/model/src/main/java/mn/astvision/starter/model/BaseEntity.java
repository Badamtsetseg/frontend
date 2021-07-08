package mn.astvision.starter.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import mn.astvision.starter.util.GlobalDateFormat;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author MethoD
 */
@Document
@Data
@NoArgsConstructor
public class BaseEntity implements Serializable {

    @Id
    private String id;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    @JsonIgnore
    private boolean deleted;

    @Transient
    public String getKey() {
        return this.id;
    }

    @Transient
    public String getCreatedDateText() {
        if (createdDate != null) {
            return GlobalDateFormat.DATE_TIME_ONLY.format(createdDate);
        } else {
            return null;
        }
    }
}
