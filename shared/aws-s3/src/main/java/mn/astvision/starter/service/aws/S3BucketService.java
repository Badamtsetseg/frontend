package mn.astvision.starter.service.aws;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

/**
 * @author MethoD
 */
@Slf4j
@Service
public class S3BucketService {

    @Value("${aws.s3.accessKey}")
    private String accessKey;

    @Value("${aws.s3.secretKey}")
    private String secretKey;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    private AmazonS3 s3Client;

    @PostConstruct
    private void init() {
        log.info("Initializing s3 bucket service with: " + accessKey);
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.AP_SOUTHEAST_1)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }

    public String upload(String fileKey, String name, String contentType, byte[] file, Map<String, String> metaData) throws AmazonServiceException {
        return uploadStream(fileKey, name, contentType, new ByteArrayInputStream(file), metaData);
    }

    public String uploadStream(String fileKey, String name, String contentType, InputStream stream, Map<String, String> metaData) throws AmazonServiceException {
        log.debug(fileKey + " -> uploading file + " + name + " to bucket: " + bucketName);

        ObjectMetadata omd = new ObjectMetadata();
        omd.setContentType(contentType);
        if (metaData != null) {
            for (String key : metaData.keySet()) {
                omd.addUserMetadata(key, metaData.get(key));
            }
        }

        // TODO append file extension
        PutObjectResult putResult = s3Client.putObject(bucketName, fileKey, stream, omd);
        log.debug(fileKey + " -> file uploaded with etag: " + putResult.getETag());

        // set public read permission
        s3Client.setObjectAcl(bucketName, fileKey, CannedAccessControlList.PublicRead);

        return s3Client.getUrl(bucketName, fileKey).toString();
    }

    public String updateContentType(String fileKey, String contentType) throws AmazonServiceException, IOException {
        log.debug(fileKey + " -> setting content type + " + contentType + " to bucket: " + bucketName);

        try (S3Object s3Object = s3Client.getObject(bucketName, fileKey)) {
            ObjectMetadata newObjectMetadata = new ObjectMetadata();
            if (s3Object.getObjectMetadata() != null) {
                newObjectMetadata.setUserMetadata(s3Object.getObjectMetadata().getUserMetadata());
            }
            newObjectMetadata.setContentType(contentType);

            CopyObjectRequest request = new CopyObjectRequest(bucketName, fileKey, bucketName, fileKey)
                    .withNewObjectMetadata(newObjectMetadata);
            CopyObjectResult copyResult = s3Client.copyObject(request);

            // set public read permission
            s3Client.setObjectAcl(bucketName, fileKey, CannedAccessControlList.PublicRead);

            return s3Client.getUrl(bucketName, fileKey).toString();
        }
    }

    public String getContentType(String fileKey) throws AmazonServiceException, IOException {
        try (S3Object s3Object = s3Client.getObject(bucketName, fileKey)) {
            return s3Object.getObjectMetadata() != null ? s3Object.getObjectMetadata().getContentType() : null;
        }
    }

    public void deleteFile(String fileKey) throws AmazonServiceException {
        s3Client.deleteObject(bucketName, fileKey);
    }
}
