package mn.astvision.starter.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * @author MethoD
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadRequest {

    private String key; // file key that will be used on s3 bucket
    private String name; // original file name
    private byte[] file;
    private Map<String, String> metaData;
}
