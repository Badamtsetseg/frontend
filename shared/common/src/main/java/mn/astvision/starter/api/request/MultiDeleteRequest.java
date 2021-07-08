package mn.astvision.starter.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author MethoD
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MultiDeleteRequest {

    private List<String> ids;
}
