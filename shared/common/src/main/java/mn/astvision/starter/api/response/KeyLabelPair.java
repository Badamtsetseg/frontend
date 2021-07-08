package mn.astvision.starter.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author MethoD
 */
@Data
@AllArgsConstructor
public class KeyLabelPair {

    private Object key;
    private String label;
}
