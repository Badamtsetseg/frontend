package mn.astvision.starter.service.aws;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.model.S3File;
import mn.astvision.starter.repository.S3FileRepository;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class S3FileService {

    @Autowired
    private S3FileRepository s3FileRepository;

    @Autowired
    private S3BucketService s3BucketService;

    public String createFile(
            String base64,
            String fileName,
            long fileSize,
            String fileContentType,
            String fileExtension,
            String entity,
            String entityId,
            String requestIp,
            String userId
    ) throws NoSuchAlgorithmException {
        InputStream stream = new ByteArrayInputStream(base64.getBytes());
        return createFile(
                stream,
                fileName,
                fileSize,
                fileContentType,
                fileExtension,
                entity,
                entityId,
                requestIp,
                userId);
    }

    public String createFile(
            InputStream stream,
            String fileName,
            long fileSize,
            String fileContentType,
            String fileExtension,
            String entity,
            String entityId,
            String requestIp,
            String userId
    ) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        DigestInputStream dis = new DigestInputStream(stream, md);

        Map<String, String> metaData = new HashMap<>();
        metaData.put("Content-Type", fileContentType);

        String fileKey = entity + "_" + entityId + "." + fileExtension;
        String url = s3BucketService.uploadStream(
                fileKey,
                fileKey,
                fileContentType,
                dis,
                metaData);

        String checksum = Hex.encodeHexString(md.digest());
        log.debug("File details: {name: " + fileName + ", contentType:"
                + fileContentType + ", size: " + fileSize + ", checksum: " + checksum + "}");

        S3File s3File = s3FileRepository.findTop1ByFileChecksum(checksum);
        log.info("File with same checksum: " + checksum + " -> " + s3File);
        if (s3File == null) {
            s3File = new S3File();
            s3File.setEntity(entity);
            s3File.setEntityId(entityId);
            s3File.setFileName(fileName);
            s3File.setFileSize(fileSize);
            s3File.setFileContentType(fileContentType);
            s3File.setFileExtension(fileExtension);
            s3File.setIpAddress(requestIp);
            s3File.setFileChecksum(checksum);
            s3File.setUrl(url);
            s3File.setCreatedBy(userId);
            s3File.setCreatedDate(LocalDateTime.now());
            s3FileRepository.save(s3File);
        } else {
            // delete current file because its already exists
            s3BucketService.deleteFile(fileKey);
        }

        return s3File.getUrl();
    }
}
