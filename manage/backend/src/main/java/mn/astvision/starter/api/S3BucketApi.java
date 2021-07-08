package mn.astvision.starter.api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import org.springframework.util.ObjectUtils;
//import org.springframework.web.bind.annotation.GetMapping;

//import java.util.List;
//import java.util.Optional;

@Slf4j
@Secured("ROLE_MANAGE_DEFAULT")
@RestController
@RequestMapping("/api/s3")
public class S3BucketApi {

//    @Autowired
//    private S3FileRepository s3FileRepository;
//
//    @Autowired
//    private S3BucketService s3BucketService;

//    @GetMapping("get-content-type")
//    public ResponseEntity<?> getContentType(String id) {
//        if (ObjectUtils.isEmpty(id)) {
//            return ResponseEntity.badRequest().body("ID null");
//        }
//
//        Optional<S3File> s3FileOpt = s3FileRepository.findById(id);
//        if (s3FileOpt.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Not found");
//        }
//
//        S3File s3File = s3FileOpt.get();
//        try {
//            String contentType = s3BucketService.getContentType(s3File.getEntity() + "_" + s3File.getEntityId() + "." + s3File.getFileExtension());
//            return ResponseEntity.ok().body(contentType);
//        } catch (Exception e) {
//            log.error(e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }

//    @GetMapping("set-content-type")
//    public ResponseEntity<?> setContentType(String id, String contentType) {
//        if (ObjectUtils.isEmpty(id)) {
//            return ResponseEntity.badRequest().body("ID null");
//        }
//
//        Optional<S3File> s3FileOpt = s3FileRepository.findById(id);
//        if (s3FileOpt.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Not found");
//        }
//
//        S3File s3File = s3FileOpt.get();
//        try {
//            s3BucketService.updateContentType(s3File.getEntity() + "_" + s3File.getEntityId() + "." + s3File.getFileExtension(), contentType);
//            return ResponseEntity.ok().body(true);
//        } catch (Exception e) {
//            log.error(e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }

//    @GetMapping("update-content-type")
//    public ResponseEntity<?> convertMathML(Integer page, Integer size) {
//        if (page == 0) {
//            page = 0;
//        }
//        if (size == 0) {
//            size = 1000;
//        }
//
//        List<S3File> s3Files = s3FileRepository.findForContentTypeUpdate(PageRequest.of(page, size));
//        for (S3File s3File : s3Files) {
//            try {
//                String newUrl = s3BucketService.updateContentType(
//                        s3File.getEntity() + "_" + s3File.getEntityId() + "." + s3File.getFileExtension(),
//                        s3File.getFileContentType());
//
//                s3File.setUrl(newUrl);
//            } catch (Exception e) {
//                log.error(e.getMessage());
//            }
//
//            s3FileRepository.save(s3File);
//        }
//
//        return ResponseEntity.ok().body(true);
//    }

//    @GetMapping("delete-by-entity")
//    public ResponseEntity<?> deleteByEntity(String entity) {
//        if (ObjectUtils.isEmpty(entity)) {
//            return ResponseEntity.badRequest().body("Entity null");
//        }
//
//        List<S3File> s3Files = s3FileRepository.findByEntity(entity);
//        for (S3File s3File : s3Files) {
//            try {
//                s3BucketService.deleteFile(s3File.getEntity() + "_" + s3File.getEntityId() + "." + s3File.getFileExtension());
//                s3FileRepository.delete(s3File);
//            } catch (Exception e) {
//                log.error(e.getMessage());
//            }
//        }
//
//        return ResponseEntity.ok().body(true);
//    }
}
