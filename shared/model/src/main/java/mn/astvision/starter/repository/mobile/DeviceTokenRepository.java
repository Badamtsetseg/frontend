package mn.astvision.starter.repository.mobile;

import mn.astvision.starter.model.mobile.DeviceToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author digz6
 */
@Repository
public interface DeviceTokenRepository extends MongoRepository<DeviceToken, String> {

    boolean existsByDeviceId(String deviceId);

    List<DeviceToken> findByUsername(String username);
//    List<DeviceToken> findByToken(String token);

    @Nullable
    DeviceToken findTop1ByDeviceId(String deviceId);
    long countByDeviceId(String deviceId);
    List<DeviceToken> findByDeviceId(String deviceId);

    @Nullable
    DeviceToken findByDeviceIdAndUsername(String deviceId, String username);
    @Nullable
    DeviceToken findByTokenAndOsAndUsername(String token, String os, String username);

    @Nullable
    DeviceToken findTop1ByTokenOrderByIdDesc(String token);
    @Nullable
    DeviceToken findByTokenAndOs(String token, String os);

    void deleteByToken(String token);
    void deleteByTokenAndOs(String token, String os);
    void deleteByDeviceId(String deviceId);
    void deleteByDeviceIdAndUsername(String deviceId, String username);
    void deleteByTokenAndOsAndUsername(String token, String os, String username);
}
