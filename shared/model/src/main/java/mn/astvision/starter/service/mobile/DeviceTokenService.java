package mn.astvision.starter.service.mobile;

import mn.astvision.starter.repository.mobile.DeviceTokenRepository;
import mn.astvision.starter.model.mobile.DeviceToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeviceTokenService {

    private static final Logger log = LoggerFactory.getLogger("deviceLogger");

    @Autowired
    private DeviceTokenRepository deviceTokenRepository;

    public DeviceToken createOrUpdate(String deviceId, String token, String os, String username, String ip) {
        DeviceToken deviceToken;
        if (!StringUtils.isEmpty(deviceId)) {
            deviceTokenRepository.deleteByDeviceId(deviceId);
            deviceToken = null;
        } else {
            deviceToken = deviceTokenRepository.findByTokenAndOs(token, os);
        }

        if (deviceToken == null) {
            deviceToken = new DeviceToken();
            deviceToken.setCreatedDate(LocalDateTime.now());
        }

        deviceToken.setDeviceId(deviceId);
        deviceToken.setToken(token);
        deviceToken.setOs(os);

        if (username != null) {
            deviceToken.setUsername(username);
        }
        deviceToken.setIp(ip);
        deviceToken.setModifiedDate(LocalDateTime.now());
        return deviceTokenRepository.save(deviceToken);
    }

    public void deleteOldToken(String username) {
        List<DeviceToken> deviceTokens = deviceTokenRepository.findByUsername(username);
        for (DeviceToken deviceToken : deviceTokens) {
            deviceTokenRepository.delete(deviceToken);
        }
    }
}
