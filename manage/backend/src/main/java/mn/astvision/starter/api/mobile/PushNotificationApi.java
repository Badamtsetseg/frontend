package mn.astvision.starter.api.mobile;

import com.mongodb.MongoException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.antd.AntdPagination;
import mn.astvision.starter.api.response.antd.AntdTableDataList;
import mn.astvision.starter.dao.mobile.PushNotificationDao;
import mn.astvision.starter.model.mobile.PushNotification;
import mn.astvision.starter.model.mobile.enums.PushNotificationReceiverType;
import mn.astvision.starter.model.mobile.enums.PushNotificationSendType;
import mn.astvision.starter.model.mobile.enums.PushNotificationType;
import mn.astvision.starter.repository.mobile.PushNotificationRepository;
import mn.astvision.starter.service.PushNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/push-notification")
public class PushNotificationApi {

    @Autowired
    private PushNotificationRepository pushNotificationRepository;

    @Autowired
    private PushNotificationDao pushNotificationDAO;

    @Autowired
    private PushNotificationService pushNotificationService;

    @Secured({"ROLE_PUSH_NOTIFICATION_VIEW", "ROLE_PUSH_NOTIFICATION_MANAGE"})
    @GetMapping
    public ResponseEntity<?> list(
            PushNotificationType type,
            PushNotificationSendType sendType,
            PushNotificationReceiverType receiverType,
            String receiver,
            Boolean sendResult,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate sentDate1,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate sentDate2,
            String sortField,
            String sortOrder,
            AntdPagination pagination
    ) {
        if (Objects.equals(sortOrder, "ascend")) {
            pagination.setSortDirection(Sort.Direction.ASC);
        } else {
            pagination.setSortDirection(Sort.Direction.DESC);
        }
        if (ObjectUtils.isEmpty(sortField)) {
            pagination.setSortParams(new String[]{"id"});
        } else {
            pagination.setSortParams(new String[]{sortField});
        }

        try {
            AntdTableDataList<PushNotification> listData = new AntdTableDataList<>();
            pagination.setTotal(pushNotificationDAO.count(type, sendType, receiverType, receiver, sendResult, sentDate1, sentDate2));
            listData.setPagination(pagination);
            listData.setList(pushNotificationDAO.list(type, sendType, receiverType, receiver, sendResult, sentDate1, sentDate2,
                    pagination.toPageRequest()));

            return ResponseEntity.ok(listData);
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Secured({"ROLE_PUSH_NOTIFICATION_VIEW", "ROLE_PUSH_NOTIFICATION_MANAGE"})
    @GetMapping("{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        if (ObjectUtils.isEmpty(id)) {
            return ResponseEntity.badRequest().body("ID хоосон байна");
        }

        try {
            Optional<PushNotification> pushNotificationOpt = pushNotificationRepository.findById(id);
            if (pushNotificationOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Push notification олдсонгүй");
            }

            return ResponseEntity.ok(pushNotificationOpt.get());
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Secured({"ROLE_PUSH_NOTIFICATION_MANAGE", "ROLE_INTERNAL_API"})
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody PushNotification request, Principal principal) {
        if (request.getSendType() == null) {
            return ResponseEntity.badRequest().body("Илгээх төрөл хоосон байна");
        }
        if (request.getReceiverType() == null) {
            return ResponseEntity.badRequest().body("Хүлээн авах төрөл хоосон байна");
        }
        if ((request.getReceiverType() == PushNotificationReceiverType.USERNAME || request.getReceiverType() == PushNotificationReceiverType.TOKEN)
                && ObjectUtils.isEmpty(request.getReceiver())) {
            return ResponseEntity.badRequest().body("Хүлээн авагч хоосон байна");
        }
        if (ObjectUtils.isEmpty(request.getTitle())) {
            return ResponseEntity.badRequest().body("Гарчиг хоосон байна");
        }
        if (ObjectUtils.isEmpty(request.getBody())) {
            return ResponseEntity.badRequest().body("Агуулга хоосон байна");
        }

        try {
            PushNotification pushNotification = new PushNotification();
            pushNotification.setType(request.getType());
            pushNotification.setSendType(request.getSendType());
            pushNotification.setScheduledDate(request.getScheduledDate());
            if (pushNotification.getScheduledDate() == null) {
                pushNotification.setScheduledDate(LocalDateTime.now());
            }
            pushNotification.setReceiverType(request.getReceiverType());
            pushNotification.setReceiver(request.getReceiver());
            if (request.getReceiverType() == PushNotificationReceiverType.USERNAME) {
                pushNotification.setReceiver(request.getReceiver().toLowerCase());
            }
            pushNotification.setPriority(request.getPriority());
            pushNotification.setTitle(request.getTitle());
            pushNotification.setBody(request.getBody());
            pushNotification.setData(request.getData());
            pushNotification.setCreatedDate(LocalDateTime.now());
            pushNotification.setCreatedBy(principal.getName());
            pushNotification = pushNotificationRepository.save(pushNotification);

            if (request.getSendType() == PushNotificationSendType.DIRECT) {
                pushNotificationService.send(pushNotification);

//                BaseResponse response = new BaseResponse();
//                response.setResult(pushNotification.getSendResult() != null ? pushNotification.getSendResult() : false);
//                response.setMessage(pushNotification.getResultMessage());
//                response.setData(pushNotification.getSuccessCount());
//                return ResponseEntity.ok(response);
            }

            return ResponseEntity.ok(true);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Secured({"ROLE_PUSH_NOTIFICATION_MANAGE"})
    @PostMapping("update")
    public ResponseEntity<?> update(@RequestBody PushNotification request, Principal principal) {
        if (ObjectUtils.isEmpty(request.getId())) {
            return ResponseEntity.badRequest().body("ID хоосон байна");
        }
        if (request.getSendType() == null) {
            return ResponseEntity.badRequest().body("Илгээх төрөл хоосон байна");
        }
        if (request.getReceiverType() == null) {
            return ResponseEntity.badRequest().body("Хүлээн авах төрөл хоосон байна");
        }
        if ((request.getReceiverType() == PushNotificationReceiverType.USERNAME || request.getReceiverType() == PushNotificationReceiverType.TOKEN)
                && ObjectUtils.isEmpty(request.getReceiver())) {
            return ResponseEntity.badRequest().body("Хүлээн авагч хоосон байна");
        }
        if (ObjectUtils.isEmpty(request.getTitle())) {
            return ResponseEntity.badRequest().body("Гарчиг хоосон байна");
        }
        if (ObjectUtils.isEmpty(request.getBody())) {
            return ResponseEntity.badRequest().body("Агуулга хоосон байна");
        }

        try {
            Optional<PushNotification> pushNotificationOpt = pushNotificationRepository.findById(request.getId());
            if (!pushNotificationOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Push notification олдсонгүй");
            }

            PushNotification pushNotification = pushNotificationOpt.get();
            if (pushNotification.getSendResult() != null) {
                return ResponseEntity.badRequest().body("Зөвхөн хараахан илгээгээгүй push notification засварлах боломжтой");
            }

            pushNotification.setType(request.getType());
            pushNotification.setSendType(request.getSendType());
            pushNotification.setScheduledDate(request.getScheduledDate());
            if (pushNotification.getScheduledDate() == null) {
                pushNotification.setScheduledDate(LocalDateTime.now());
            }
            pushNotification.setReceiverType(request.getReceiverType());
            pushNotification.setReceiver(request.getReceiver());
            if (request.getReceiverType() == PushNotificationReceiverType.USERNAME) {
                pushNotification.setReceiver(request.getReceiver().toLowerCase());
            }
            pushNotification.setPriority(request.getPriority());
            pushNotification.setTitle(request.getTitle());
            pushNotification.setBody(request.getBody());
            pushNotification.setData(request.getData());
            pushNotification.setCreatedDate(LocalDateTime.now());
            pushNotification.setCreatedBy(principal.getName());
            pushNotificationRepository.save(pushNotification);

            if (request.getSendType() == PushNotificationSendType.DIRECT) {
                pushNotificationService.send(pushNotification);

//                BaseResponse response = new BaseResponse();
//                response.setResult(pushNotification.getSendResult() != null ? pushNotification.getSendResult() : false);
//                response.setMessage(pushNotification.getResultMessage());
//                response.setData(pushNotification.getSuccessCount());
//                return ResponseEntity.ok(response);
            }

            return ResponseEntity.ok(true);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
