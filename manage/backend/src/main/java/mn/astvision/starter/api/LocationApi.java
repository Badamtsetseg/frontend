package mn.astvision.starter.api;

import com.mongodb.MongoException;
import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.dto.LocationDto;
import mn.astvision.starter.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/location")
@Secured("ROLE_DEFAULT")
public class LocationApi {

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping
    public ResponseEntity<?> get(Integer parentId) {
        try {
            List<LocationDto> locations = new ArrayList<>();
            locationRepository.findByParentIdAndDeletedFalse(parentId).forEach((location -> {
                locations.add(
                        LocationDto.builder()
                                .locationId(location.getLocationId())
                                .parentId(location.getParentId())
                                .nameMn(location.getNameMn())
                                .isLeaf(location.isLeaf())
                                .build()
                );
            }));
            return ResponseEntity.ok(locations);
        } catch (MongoException | DataAccessException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.badRequest().body("error.database");
        }
    }
}
