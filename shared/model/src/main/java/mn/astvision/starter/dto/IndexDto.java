package mn.astvision.starter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 *
 * @author MethoD
 */
@Data
@AllArgsConstructor
public class IndexDto {

    private String collection;
    private String field;
    private boolean unique;

    public IndexDto(String collection, String field) {
        this.collection = collection;
        this.field = field;
    }
}
