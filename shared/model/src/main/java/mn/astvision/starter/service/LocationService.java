package mn.astvision.starter.service;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.repository.LocationRepository;
import mn.astvision.starter.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public String getLocationFullName(List<Integer> locations) {
//        log.debug("locations " + locations);
        if (locations != null && !locations.isEmpty()) {
            StringBuilder text = new StringBuilder();
            for (Integer i : locations) {
                Location location = locationRepository.findByLocationId(i);
                assert location != null;
                text.append(location.getNameMn());
                if (locations.indexOf(i) + 1 != locations.size())
                    text.append(", ");
            }

//            Integer cityId = locations.get(0);
//            Integer districtId = locations.get(1);
//            Integer quarterId = locations.get(2);
//            Location city = locationRepository.findByLocationId(cityId);
//            Location district = locationRepository.findByLocationId(districtId);
//            Location quarter = locationRepository.findByLocationId(quarterId);
//            if (city != null && district != null && quarter != null) {
//                return city.getNameMn() + ", " + district.getNameMn() + ", " + quarter.getNameMn();
//            }
//            log.debug("text " + text);
            return text.toString();
        }
        return "";
    }
}
