package mn.astvision.starter.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author naba
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
public class Location extends BaseEntity {

    private int locationId;
    private int parentId;
    @JsonIgnore
    private int type;
    @JsonIgnore
    private String nameEn;
    private String nameMn;
    private boolean isLeaf;
    @JsonIgnore
    private int xypCode;
    @JsonIgnore
    private int dmsCode;
    @JsonIgnore
    private String archiveCode;
}
