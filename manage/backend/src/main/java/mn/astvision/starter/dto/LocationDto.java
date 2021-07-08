package mn.astvision.starter.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * @author naba
 */
@Data
@Builder
@AllArgsConstructor
public class LocationDto {

    private int locationId;
    private int parentId;
    @JsonProperty("name")
    private String nameMn;
    private Boolean isLeaf;
}
