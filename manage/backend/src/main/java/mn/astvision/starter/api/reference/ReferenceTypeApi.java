package mn.astvision.starter.api.reference;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.antd.AntdPagination;
import mn.astvision.starter.api.response.antd.AntdTableDataList;
import mn.astvision.starter.dao.reference.ReferenceTypeDao;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.model.reference.ReferenceType;
import mn.astvision.starter.repository.auth.UserRepository;
import mn.astvision.starter.repository.reference.ReferenceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

@Slf4j
@RestController
@RequestMapping("/api/reference-type")
public class ReferenceTypeApi {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReferenceTypeRepository referenceTypeRepository;

    @Autowired
    private ReferenceTypeDao referenceTypeDAO;

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping
    public ResponseEntity<?> list(String name, String description, Boolean deleted, String sortOrder, String sortField, AntdPagination pagination, Locale locale) {
//        log.debug("Reference type list -> name: " + name + ", deleted: " + deleted + ", pagination: " + pagination);
        AntdTableDataList<ReferenceType> listData = new AntdTableDataList<>();
        String sort = "DESC";
        if (!ObjectUtils.isEmpty(sortOrder)) {
            if (sortOrder.equals("ascend")) {
                sort = "ASC";
            } else {
                sort = "DESC";
            }
        }

        pagination.setTotal(referenceTypeDAO.count(description, name, deleted));
        listData.setPagination(pagination);
        listData.setList(referenceTypeDAO.list(description, name, deleted,
                PageRequest.of(pagination.getCurrentPage(), pagination.getPageSize(),
                        Sort.by(Sort.Direction.fromString(sort), !ObjectUtils.isEmpty(sortField) ? sortField : "createdDate"))
        ));

        return ResponseEntity.ok(listData);
    }

    @GetMapping("select")
    public ResponseEntity<?> select(Boolean deleted, Locale locale) {

        List<AggregationOperation> aggOperations = new ArrayList<>();

        aggOperations.add(Aggregation.match(Criteria.where("deleted").is(false)));
        aggOperations.add(sort(Sort.Direction.ASC, "createdDate"));

//            if (deleted != null) {
//                aggOperations.add(Aggregation.match(Criteria.where("deleted").is(deleted)));
//            }

        Aggregation selectAggregation = newAggregation(aggOperations);

        AggregationResults<ReferenceType> getAll = mongoTemplate.aggregate(selectAggregation, ReferenceType.class, ReferenceType.class);
        List<ReferenceType> result = getAll.getMappedResults();
        return ResponseEntity.ok(result);
    }

    @PostMapping("create")
    @Secured("ROLE_REFERENCE_TYPE_MANAGE")
    public ResponseEntity<?> create(@RequestBody ReferenceType createRequest, Principal principal, Locale locale) {
        log.debug("create -> " + createRequest);

        if (ObjectUtils.isEmpty(createRequest.getCode())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("code Хоосон байна.");
        }

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user != null) {
            if (referenceTypeRepository.existsByCodeAndDeletedFalse(createRequest.getCode().toUpperCase())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("code давхцаж байна.");
            }
            ReferenceType referenceType = new ReferenceType();
            referenceType.setName(createRequest.getName());
            referenceType.setCode(createRequest.getCode().toUpperCase());
            referenceType.setIcon(createRequest.getIcon());
            referenceType.setDescription(createRequest.getDescription());
            referenceType.setActive(createRequest.isActive());

            referenceType = referenceTypeRepository.save(referenceType);
            return ResponseEntity.ok(referenceType.getId());

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }
    }

    @PostMapping("update")
    @Secured("ROLE_REFERENCE_TYPE_MANAGE")
    public ResponseEntity<?> update(@RequestBody ReferenceType updateRequest, Principal principal, Locale locale) {
        log.debug("update -> " + updateRequest);

        if (ObjectUtils.isEmpty(updateRequest.getId()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID хоосон байна.");

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());

        if (user != null) {
            Optional<ReferenceType> typeOptional = referenceTypeRepository.findById(updateRequest.getId());

            if (typeOptional.isPresent()) {
                ReferenceType referenceType = typeOptional.get();

                referenceType.setName(updateRequest.getName());
                referenceType.setIcon(updateRequest.getIcon());
                referenceType.setDescription(updateRequest.getDescription());
                referenceType.setActive(updateRequest.isActive());

                referenceType = referenceTypeRepository.save(referenceType);
                return ResponseEntity.ok(referenceType.getId());

            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ReferenceType not found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> get(@PathVariable String id, Locale locale) {
        return ResponseEntity.ok().body(referenceTypeRepository.findById(id).orElse(null));
    }

    @GetMapping("get-for-code/{code}")
    public ResponseEntity<?> getForCode(@PathVariable String code) {
        return ResponseEntity.ok().body(referenceTypeRepository.findByCode(code).orElse(null));
    }

    @PostMapping("delete")
    @Secured("ROLE_REFERENCE_TYPE_MANAGE")
    public ResponseEntity<?> deleteMulti(@RequestParam String id, Principal principal) {
        log.debug("delete id ->  " + id);

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user != null) {
            Optional<ReferenceType> typeOptional = referenceTypeRepository.findById(id);
            if (typeOptional.isPresent()) {
                ReferenceType referenceType = typeOptional.get();
                referenceType.setDeleted(true);
                referenceType.setActive(false);

                referenceTypeRepository.save(referenceType);
                return ResponseEntity.ok().body(true);
            } else
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ReferenceData not found.");
        } else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
    }

}
