package mn.astvision.starter.service;

import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.MessagingErrorCode;
import com.google.firebase.messaging.SendResponse;
import com.mongodb.MongoException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.dao.mobile.DeviceTokenDao;
import mn.astvision.starter.dao.mobile.PushNotificationDao;
import mn.astvision.starter.google.firebase.FirebaseMessagingService;
import mn.astvision.starter.model.mobile.DeviceToken;
import mn.astvision.starter.model.mobile.PushNotification;
import mn.astvision.starter.model.mobile.PushNotificationResult;
import mn.astvision.starter.model.mobile.enums.PushNotificationReceiverType;
import mn.astvision.starter.repository.mobile.DeviceTokenRepository;
import mn.astvision.starter.repository.mobile.PushNotificationRepository;
import mn.astvision.starter.repository.mobile.PushNotificationResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
@Service
public class PushNotificationService {

    private static final int MAX_TOKENS_PER_BATCH = 500;
    private static final int THREAD_COUNT = 5;

    @Autowired
    private FirebaseMessagingService firebaseMessagingService;

    @Autowired
    private DeviceTokenRepository deviceTokenRepository;

    @Autowired
    private DeviceTokenDao deviceTokenDao;

    @Autowired
    private PushNotificationRepository pushNotificationRepository;

    @Autowired
    private PushNotificationDao pushNotificationDAO;

    @Autowired
    private PushNotificationResultRepository pushNotificationResultRepository;

    private final ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);

    @Async
    public void send(PushNotification pushNotification) throws MongoException {
        switch (pushNotification.getReceiverType()) {
            case TOKEN:
            case USERNAME:
                sendOne(pushNotification);
            case ALL:
            default:
                sendMulti(pushNotification);
        }
    }

    @Async
    public void sendOne(PushNotification pushNotification) throws MongoException {
        if (pushNotification.getReceiverType() == PushNotificationReceiverType.TOKEN
                || pushNotification.getReceiverType() == PushNotificationReceiverType.USERNAME) {

            switch (pushNotification.getReceiverType()) {
                case USERNAME:
                    List<PushNotificationResult> pushNotificationResults = new ArrayList<>();
                    List<DeviceToken> deviceTokens = deviceTokenRepository.findByUsername(pushNotification.getReceiver());

                    List<String> tokens = new ArrayList<>();
                    for (DeviceToken deviceToken : deviceTokens) {
                        tokens.add(deviceToken.getToken());

                        PushNotificationResult pushNotificationResult = new PushNotificationResult();
                        pushNotificationResult.setPushNotificationId(pushNotification.getId());
                        pushNotificationResult.setOs(deviceToken.getOs());
                        pushNotificationResult.setToken(deviceToken.getToken());
                        pushNotificationResult.setDeviceId(deviceToken.getDeviceId());
                        pushNotificationResult.setCreatedDate(LocalDateTime.now());
                        pushNotificationResults.add(pushNotificationResult);
                    }

                    if (!tokens.isEmpty()) {
                        try {
                            BatchResponse batchResponse = firebaseMessagingService.sendMulti(
                                    tokens,
                                    pushNotification.getType(),
                                    pushNotification.getTitle(),
                                    pushNotification.getBody(),
                                    pushNotification.getData());

                            pushNotification.setSuccessCount(batchResponse.getSuccessCount());
                            pushNotification.setFailureCount(batchResponse.getFailureCount());
                            pushNotification.setSendResult(true);
                            pushNotification.setSentDate(LocalDateTime.now());

                            if (batchResponse.getResponses() != null && batchResponse.getResponses().size() == pushNotificationResults.size()) {
                                for (int i = 0; i < batchResponse.getResponses().size(); i++) {
                                    SendResponse sendResponse = batchResponse.getResponses().get(i);

                                    PushNotificationResult pushNotificationResult = pushNotificationResults.get(i);
                                    pushNotificationResult.setSendResult(sendResponse.isSuccessful());
                                    pushNotificationResult.setMessageId(sendResponse.getMessageId());
                                    if (!sendResponse.isSuccessful()) {
                                        if (sendResponse.getException() != null) {
                                            pushNotificationResult.setResultMessage("" + sendResponse.getException().getMessagingErrorCode());

                                            if (sendResponse.getException().getMessagingErrorCode() == MessagingErrorCode.UNREGISTERED) {
                                                removeDeviceToken(pushNotificationResult.getOs(), pushNotificationResult.getToken());
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (IllegalArgumentException | FirebaseMessagingException e) {
                            log.error(e.getMessage(), e);

                            pushNotification.setSendResult(false);
                            pushNotification.setResultMessage(e.getMessage());
                        }
                    } else {
                        pushNotification.setSendResult(false);
                        pushNotification.setResultMessage("Тухайн иргэнд хамаарах device token олдсонгүй");
                    }

                    pushNotificationRepository.save(pushNotification);
                    pushNotificationResultRepository.saveAll(pushNotificationResults);
                    break;
                case TOKEN:
                default:
                    DeviceToken deviceToken = deviceTokenRepository.findTop1ByTokenOrderByIdDesc(pushNotification.getReceiver());
                    if (deviceToken != null) {
                        PushNotificationResult pushNotificationResult = new PushNotificationResult();
                        pushNotificationResult.setPushNotificationId(pushNotification.getId());
                        pushNotificationResult.setOs(deviceToken.getOs());
                        pushNotificationResult.setToken(deviceToken.getToken());
                        pushNotificationResult.setDeviceId(deviceToken.getDeviceId());

                        try {
                            pushNotificationResult.setMessageId(firebaseMessagingService.send(
                                    pushNotification.getReceiver(),
                                    pushNotification.getType(),
                                    pushNotification.getTitle(),
                                    pushNotification.getBody(),
                                    pushNotification.getData()));
                            pushNotificationResult.setSendResult(true);
                            pushNotificationResult.setSentDate(LocalDateTime.now());

                            pushNotification.setSuccessCount(1);
                            pushNotification.setSendResult(true);
                            pushNotification.setSentDate(LocalDateTime.now());
                        } catch (FirebaseMessagingException e) {
                            log.error(e.getMessage(), e);
                            pushNotificationResult.setResultMessage(e.getMessage());

                            pushNotification.setFailureCount(1);
                            pushNotification.setSendResult(false);
                            pushNotification.setResultMessage("" + e.getMessagingErrorCode());

                            if (e.getMessagingErrorCode() == MessagingErrorCode.UNREGISTERED) {
                                removeDeviceToken(pushNotificationResult.getOs(), pushNotificationResult.getToken());
                            }
                        }

                        pushNotificationResult.setCreatedDate(LocalDateTime.now());
                        pushNotificationResultRepository.save(pushNotificationResult);
                    } else {
                        pushNotification.setSendResult(false);
                        pushNotification.setResultMessage("Device token null");
                        log.error(pushNotification.getReceiverType() + " - " + pushNotification.getReceiver() + " -> device token null");
                    }

                    pushNotificationRepository.save(pushNotification);
                    break;
            }
        }
    }

    @Async
    public void sendMulti(PushNotification pushNotification) throws MongoException {
        if (pushNotification.getReceiverType() == PushNotificationReceiverType.ALL) {
            pushNotification.setSendResult(true);
            pushNotification.setSentDate(LocalDateTime.now());
            pushNotificationRepository.save(pushNotification);

            long deviceTokenCount = deviceTokenRepository.count();

            for (int batch = 0; batch <= deviceTokenCount / MAX_TOKENS_PER_BATCH / THREAD_COUNT; batch++) {
                for (int thread = 0; thread < THREAD_COUNT; thread++) {
                    int page = batch * THREAD_COUNT + thread;
                    if (page == 0) {
                        log.info("preparing to send: " + pushNotification.getId());
                    }
                    if (batch == deviceTokenCount / MAX_TOKENS_PER_BATCH / THREAD_COUNT) {
                        log.info("finished preparing to send: " + pushNotification.getId());
                    }
//                        log.info("preparing to send: " + page);
                    List<String> tokens = deviceTokenDao.getTokensOnly(PageRequest.of(page, MAX_TOKENS_PER_BATCH));
                    if (!tokens.isEmpty()) {
                        executorService.submit(new NotificationSendTask(pushNotification, tokens));
                    }
                }
            }
        }
    }

    class NotificationSendTask implements Callable<Boolean> {
        PushNotification pushNotification;
        List<String> tokens;

        public NotificationSendTask(PushNotification pushNotification, List<String> tokens) {
            this.pushNotification = pushNotification;
            this.tokens = tokens;
        }

        @Override
        public Boolean call() {
            try {
//                log.info("sending to: " + tokens.size());
//                pushNotificationDAO.incBatchCountSent(pushNotification.getId(), 499, 1);
                try {
                    BatchResponse batchResponse = firebaseMessagingService.sendMulti(
                            tokens,
                            pushNotification.getType(),
                            pushNotification.getTitle(),
                            pushNotification.getBody(),
                            pushNotification.getData());

                    pushNotificationDAO.incCountSent(pushNotification.getId(), batchResponse.getSuccessCount(), batchResponse.getFailureCount());

                    if (batchResponse.getResponses() != null && batchResponse.getResponses().size() == tokens.size()) {
                        for (int i = 0; i < batchResponse.getResponses().size(); i++) {
                            SendResponse sendResponse = batchResponse.getResponses().get(i);

                            if (!sendResponse.isSuccessful()) {
                                if (sendResponse.getException() != null) {
                                    if (sendResponse.getException().getMessagingErrorCode() == MessagingErrorCode.UNREGISTERED) {
                                        removeDeviceToken(tokens.get(i));
                                    }
                                }
                            }
                        }
                    }
                } catch (IllegalArgumentException | FirebaseMessagingException e) {
                    log.error(e.getMessage(), e);
                }
                return true;
            } catch (Exception e) {
                log.error(e.getMessage(), e);
                return false;
            }
        }
    }

    private void removeDeviceToken(String token) {
        try {
            log.info("removing device token " + token);
            deviceTokenRepository.deleteByToken(token);
        } catch (MongoException e) {
            log.error(e.getMessage(), e);
        }
    }

    private void removeDeviceToken(String os, String token) {
        try {
            log.info("removing device token " + os + " - " + token);
            deviceTokenRepository.deleteByTokenAndOs(token, os);
        } catch (MongoException e) {
            log.error(e.getMessage(), e);
        }
    }
}
