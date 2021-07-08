package mn.astvision.starter.model.reference;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mn.astvision.starter.model.BaseEntityWithUser;
import mn.astvision.starter.model.FileData;
import org.springframework.data.annotation.Transient;

@Data
@EqualsAndHashCode(callSuper = true)
public class ReferenceData extends BaseEntityWithUser {

    private String typeCode; // reference type code
    private String name;
    private String description;
    private Integer order;
    private FileData icon;

    private boolean active = true;

    @Transient
    private String createdUserFullName;
    @Transient
    private String typeName;
}
