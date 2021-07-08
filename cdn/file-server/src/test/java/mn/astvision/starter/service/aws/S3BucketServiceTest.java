package mn.astvision.starter.service.aws;

import com.amazonaws.AmazonServiceException;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author MethoD
 */
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class S3BucketServiceTest {

    @Autowired
    private S3BucketService s3BucketService;

    private final String fileKey = "test-image2";

    @Test
    public void testPut() {
        try {
            log.info("Testing s3 put request...");
            log.info("Uploaded to: " + s3BucketService.upload(fileKey, "bla2.png", "image/png", "bla 2".getBytes(), null));
//            s3BucketService.deleteFile(fileKey);
        } catch (AmazonServiceException e) {
            log.error(e.getMessage(), e);
        }
    }

    @Test
    public void testDelete() {
        try {
            log.info("Testing s3 delete request...");
            s3BucketService.deleteFile(fileKey);
        } catch (AmazonServiceException e) {
            log.error(e.getMessage(), e);
        }
    }
}
