package mn.astvision.starter.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author MethoD
 */
@Data
//@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse {

    private boolean result;
    private String message;
    private Object data;

    public BaseResponse(boolean result) {
        this.result = result;
    }

    public BaseResponse(String message) {
        this.message = message;
    }
}
