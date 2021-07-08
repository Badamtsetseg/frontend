package mn.astvision.starter.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author digz6
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class S3File extends BaseEntityWithUser {

    private String entity;
    private String entityId;

    private String fileId;
    private String fileExtension;
    private String fileName;
    private long fileSize;
    private String fileContentType;
    private String fileChecksum;

    private String ipAddress;
    private String url;

//    private Boolean contentTypeSynced; // S3-д content type хадгалсан эсэх
}
