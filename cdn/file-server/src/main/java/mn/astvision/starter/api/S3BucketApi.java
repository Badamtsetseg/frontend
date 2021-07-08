package mn.astvision.starter.api;

import com.amazonaws.AmazonServiceException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.response.BaseResponse;
import mn.astvision.starter.service.aws.S3FileService;
import mn.astvision.starter.util.RequestIpUtil;
import mn.astvision.starter.util.TextUtil;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;

/**
 * @author MethoD
 */
@Slf4j
@Secured("ROLE_MANAGE_DEFAULT")
@RestController
@RequestMapping("/api/s3")
public class S3BucketApi {

    @Autowired
    private S3FileService s3FileService;

//    @RequestMapping(value = "upload", method = RequestMethod.POST)
//    public BaseResponse uploadImage(@RequestBody FileUploadRequest fileUploadRequest,
//            Principal principal, Locale locale, HttpServletRequest servletRequest) {
//        BaseResponse response = new BaseResponse();
//
//        try {
//            response.setData(s3BucketService.upload(
//                    fileUploadRequest.getKey(),
//                    fileUploadRequest.getName(),
//                    fileUploadRequest.getFile(),
//                    fileUploadRequest.getMetaData()));
//            response.setResult(true);
//        } catch (AmazonServiceException e) {
//            log.error(e.getMessage(), e);
//            response.setMessage(e.getMessage());
//        }
//
//        return response;
//    }

    @PostMapping(value = "upload", consumes = "multipart/form-data")
    public ResponseEntity<BaseResponse> upload(
            @RequestParam("entity") String entity,
            @RequestParam(name = "entityId", required = false) String entityId,
            @RequestPart("file") MultipartFile file,
            Principal principal,
            HttpServletRequest servletRequest) {
        log.debug("File upload request: {entity: " + entity + ", entityId: " + entityId + ", user: " + principal.getName() + "}");

        if (ObjectUtils.isEmpty(entity) || file.isEmpty()) {
            return ResponseEntity.badRequest().body(new BaseResponse("Файл хоосон байна"));
        }
        if (ObjectUtils.isEmpty(file.getOriginalFilename())) {
            return ResponseEntity.badRequest().body(new BaseResponse("Файлын нэр хоосон байна"));
        }
        if (!TextUtil.isAlphaNumeric(entity) || !TextUtil.isAlphaNumeric(entityId)) {
            return ResponseEntity.badRequest().body(new BaseResponse("Файлын entity, entityId буруу байна"));
        }

        // check file content type
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename()).toLowerCase();
        switch (fileExtension) {
            case "jpg":
            case "png":
                if (file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.badRequest().body(new BaseResponse("Зурган файлын дээд хэмжээ 10MB байна"));
                }
//                BufferedImage image = null;
//                try {
//                    image = ImageIO.read(file.getInputStream());
//                } catch (IOException e) {
//                    //
//                }
//                if (image == null) {
//                    return ResponseEntity.badRequest().body(new BaseResponse("Алдаатай зурган файл байна"));
//                }
                break;
            case "svg":
                if (file.getSize() > 0.5 * 1024 * 1024) {
                    return ResponseEntity.badRequest().body(new BaseResponse("SVG файлын дээд хэмжээ 0.5MB байна"));
                }
                break;
            case "json":
                if (file.getSize() > 1024 * 1024) {
                    return ResponseEntity.badRequest().body(new BaseResponse("JSON файлын дээд хэмжээ 1MB байна"));
                }
                break;
            case "pdf":
                if (file.getSize() > 50 * 1024 * 1024) {
                    return ResponseEntity.badRequest().body(new BaseResponse("PDF файлын дээд хэмжээ 50MB байна"));
                }
                break;
//            case "dwg":
//                if (file.getSize() > 10 * 1024 * 1024) {
//                    return ResponseEntity.badRequest().body(new BaseResponse("DWG файлын дээд хэмжээ 10MB байна"));
//                }
//                break;
            default:
                return ResponseEntity.badRequest().body(new BaseResponse("Файлын төрөл зөвшөөрөгдөөгүй байна, зөвхөн JPG, PNG зураг болон PDF оруулна уу"));
        }

        try {
            String s3FileUrl = s3FileService.createFile(
                    file.getInputStream(),
                    file.getOriginalFilename(),
                    file.getSize(),
                    file.getContentType(),
                    fileExtension,
                    entity,
                    entityId,
                    RequestIpUtil.getClientIP(servletRequest),
                    principal.getName()
            );

            return ResponseEntity.ok(new BaseResponse(true, null, s3FileUrl));
        } catch (NoSuchAlgorithmException | NoSuchMessageException | IOException | AmazonServiceException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponse(e.getMessage()));
        }
    }
}
