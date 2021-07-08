package mn.astvision.starter.api.reference;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.DeleteRequest;
import mn.astvision.starter.api.request.antd.AntdPagination;
import mn.astvision.starter.api.response.antd.AntdTableDataList;
import mn.astvision.starter.dao.reference.CountryDao;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.model.reference.Country;
import mn.astvision.starter.repository.auth.UserRepository;
import mn.astvision.starter.repository.reference.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("/api/country")
public class CountryApi {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private CountryDao countryDAO;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> list(String code, String name, Boolean university, Boolean scholarship, Boolean deleted, AntdPagination pagination) {
        AntdTableDataList<Country> listData = new AntdTableDataList<>();

        pagination.setTotal(countryDAO.count(code, name, university, scholarship, deleted));
        listData.setPagination(pagination);
        listData.setList(countryDAO.list(code, name, university, scholarship, deleted, pagination.toPageRequest()));
        return ResponseEntity.ok(listData);
    }

    @GetMapping("select")
    public ResponseEntity<?> select(String code, String name, Boolean university, Boolean scholarship, Boolean deleted) {
        return ResponseEntity.ok(countryDAO.list(code, name, university, scholarship, deleted, null));
    }

    @GetMapping("{id}")
    public ResponseEntity<Country> get(@PathVariable String id) {
        return ResponseEntity.ok().body(countryRepository.findById(id).orElse(null));
    }

    @Secured("ROLE_MANAGE_COUNTRY")
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Country createRequest, Principal principal) {
        Country country = new Country();
        if (ObjectUtils.isEmpty(createRequest.getCode()))
            return ResponseEntity.badRequest().body("Улсын код хоосон байна");

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хандах эрхгүй байна");

        if (countryRepository.existsByCodeAndDeletedFalse(createRequest.getCode().toUpperCase()))
            return ResponseEntity.badRequest().body("Улсын код давхардаж байна");

        country.setCode(createRequest.getCode().toUpperCase());
        country.setName(createRequest.getName());
        country.setUniversity(createRequest.isUniversity());
        country.setScholarship(createRequest.isScholarship());
        country.setImage(createRequest.getImage());
        country.setOrder(createRequest.getOrder());
        country.setCreatedBy(user.getId());
        country.setCreatedDate(LocalDateTime.now());
        country = countryRepository.save(country);
        return ResponseEntity.ok(country);
    }

    @Secured("ROLE_MANAGE_COUNTRY")
    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody Country updateRequest, Principal principal) {
        if (ObjectUtils.isEmpty(updateRequest.getCode()))
            return ResponseEntity.badRequest().body("Улсын код хоосон байна");

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хандах эрхгүй байна");

        Country country = countryRepository.findById(updateRequest.getCode()).orElse(null);
        if (country == null)
            return ResponseEntity.badRequest().body("Улс олдсонгүй: " + updateRequest.getCode());

        country.setName(updateRequest.getName());
        country.setUniversity(updateRequest.isUniversity());
        country.setScholarship(updateRequest.isScholarship());
        country.setImage(updateRequest.getImage());
        country.setOrder(updateRequest.getOrder());
        country.setModifiedBy(user.getId());
        country.setModifiedDate(LocalDateTime.now());
        country = countryRepository.save(country);
        return ResponseEntity.ok(country);
    }

    @Secured("ROLE_MANAGE_COUNTRY")
    @DeleteMapping("delete")
    public ResponseEntity<?> delete(@RequestBody DeleteRequest deleteRequest, Principal principal) {
        if (ObjectUtils.isEmpty(deleteRequest.getId()))
            return ResponseEntity.badRequest().body("Улсын код хоосон байна");

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хандах эрхгүй байна");

        Country country = countryRepository.findById(deleteRequest.getId()).orElse(null);
        if (country == null)
            return ResponseEntity.badRequest().body("Улс олдсонгүй: " + deleteRequest.getId());

        country.setDeleted(true);
        country.setModifiedBy(user.getId());
        country.setModifiedDate(LocalDateTime.now());
        countryRepository.save(country);
        return ResponseEntity.ok().body(null);
    }
}
