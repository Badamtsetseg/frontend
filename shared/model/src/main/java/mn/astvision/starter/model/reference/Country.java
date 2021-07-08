package mn.astvision.starter.model.reference;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import mn.astvision.starter.model.FileData;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.index.Indexed;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author Tergel
 * Улс
 */
@Data
public class Country implements Serializable {

    @Id
    @Indexed
    private String code;
    @Indexed
    private String name;
    @Indexed
    private boolean university = false;
    @Indexed
    private boolean scholarship = false;
    @Indexed
    private Integer order = 0;
    private FileData image;

    @CreatedBy
    @JsonIgnore
    private String createdBy;

    @LastModifiedBy
    @JsonIgnore
    private String modifiedBy;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    @JsonIgnore
    private boolean deleted;

    @Transient
    public String getKey() {
        return this.code;
    }

    @Transient
    public String imageUrl() {
        return image != null ? image.getUrl() : null;
    }
}
