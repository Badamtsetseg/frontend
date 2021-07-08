package mn.astvision.starter.api.reference;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.antd.AntdPagination;
import mn.astvision.starter.api.response.antd.AntdTableDataList;
import mn.astvision.starter.dao.reference.ReferenceDataDao;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.model.reference.ReferenceData;
import mn.astvision.starter.repository.auth.UserRepository;
import mn.astvision.starter.repository.reference.ReferenceDataRepository;
import mn.astvision.starter.service.ReferenceDataService;
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
import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

@Slf4j
@RestController
@RequestMapping("/api/reference-data")
public class ReferenceDataApi {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReferenceDataRepository referenceDataRepository;

    @Autowired
    private ReferenceDataDao referenceDataDAO;

    @Autowired
    private ReferenceDataService referenceDataService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping
    public ResponseEntity<?> list(
            String typeCode,
            String description,
            Integer order,
            String name,
            String sortOrder,
            String sortField,
            AntdPagination pagination) {

        AntdTableDataList<ReferenceData> listData = new AntdTableDataList<>();
        String sort;
        if (!ObjectUtils.isEmpty(sortOrder)) {
            if (sortOrder.equals("ascend")) {
                sort = "ASC";
            } else {
                sort = "DESC";
            }
        } else {
            sort = "ASC";
        }

        pagination.setTotal(referenceDataDAO.count(typeCode, description, order, name));
        listData.setPagination(pagination);
        listData.setList(referenceDataService.list(typeCode, description, order, name,
                PageRequest.of(pagination.getCurrentPage(), pagination.getPageSize(),
                        Sort.by(Sort.Direction.fromString(sort), !ObjectUtils.isEmpty(sortField) ? sortField : "order"))));

        return ResponseEntity.ok(listData);

    }

    @GetMapping("select")
    public ResponseEntity<?> select(String typeCode) {
        if (ObjectUtils.isEmpty(typeCode)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("typeCode Хоосон байна.");
        }

        List<AggregationOperation> aggOperations = new ArrayList<>();
        aggOperations.add(Aggregation.match(Criteria.where("typeCode").is(typeCode)));
        aggOperations.add(Aggregation.match(Criteria.where("deleted").is(false)));
        aggOperations.add(sort(Sort.Direction.ASC, "order"));

        Aggregation selectAggregation = newAggregation(aggOperations);

        AggregationResults<ReferenceData> getAll = mongoTemplate.aggregate(selectAggregation, ReferenceData.class, ReferenceData.class);
        List<ReferenceData> result = getAll.getMappedResults();

        return ResponseEntity.ok(result);
    }


    @PostMapping("create")
    @Secured("ROLE_REFERENCE_DATA_MANAGE")
    public ResponseEntity<?> create(@RequestBody ReferenceData createRequest, Principal principal, Locale locale) {
        log.debug("create -> " + createRequest);
        if (ObjectUtils.isEmpty(createRequest.getTypeCode()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("typeCode Хоосон байна.");
        if (createRequest.getOrder() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("order Хоосон байна.");

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user != null) {
            if (referenceDataRepository.existsByOrderAndTypeCodeAndDeletedFalse(createRequest.getOrder(), createRequest.getTypeCode())) {
                changeOrderFromCrate(createRequest);
            }

            ReferenceData referenceData = new ReferenceData();
            referenceData.setTypeCode(createRequest.getTypeCode());
            referenceData.setActive(createRequest.isActive());
            referenceData.setName(createRequest.getName());
            referenceData.setDescription(createRequest.getDescription());
            referenceData.setOrder(createRequest.getOrder());
            referenceData.setIcon(createRequest.getIcon());

            referenceData = referenceDataRepository.save(referenceData);

            return ResponseEntity.ok(referenceData.getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }
    }

    @PostMapping("update")
    @Secured("ROLE_REFERENCE_DATA_MANAGE")
    public ResponseEntity<?> update(@RequestBody ReferenceData updateRequest, Principal principal, Locale locale) {
        log.debug("update -> " + updateRequest);
        if (ObjectUtils.isEmpty(updateRequest.getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID Хоосон байна.");
        }

        if (updateRequest.getOrder() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("order Хоосон байна.");

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user != null) {
            Optional<ReferenceData> referenceDataOptional = referenceDataRepository.findById(updateRequest.getId());
            referenceDataOptional.ifPresent(referenceData -> changeOrderFromUpdate(referenceData, updateRequest));

            if (referenceDataOptional.isPresent()) {
                ReferenceData referenceData = referenceDataOptional.get();

                referenceData.setName(updateRequest.getName());

                referenceData.setTypeCode(updateRequest.getTypeCode());
                referenceData.setActive(updateRequest.isActive());

                referenceData.setDescription(updateRequest.getDescription());
                referenceData.setOrder(updateRequest.getOrder());
                referenceData.setIcon(updateRequest.getIcon());


                referenceData = referenceDataRepository.save(referenceData);

                return ResponseEntity.ok(referenceData.getId());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ReferenceData not found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }

    }

    @GetMapping("{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        return ResponseEntity.ok().body(referenceDataRepository.findById(id).orElse(null));
    }

    @PostMapping("delete")
    @Secured("ROLE_REFERENCE_DATA_MANAGE")
    public ResponseEntity<?> deleteMulti(@RequestParam String id, Principal principal) {
        log.debug("delete id -> " + id);

        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user != null) {
            Optional<ReferenceData> referenceDataOptional = referenceDataRepository.findById(id);
            if (referenceDataOptional.isPresent()) {
                ReferenceData referenceData = referenceDataOptional.get();
                referenceData.setDeleted(true);
                referenceData.setActive(false);
                referenceData = referenceDataRepository.save(referenceData);
                changeOrderFromDelete(referenceData);
                return ResponseEntity.ok().body(null);
            } else
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ReferenceData not found.");
        } else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");

    }

    private void changeOrderFromDelete(ReferenceData updateRequest) {
        List<ReferenceData> referenceDatas = referenceDataRepository.findAllByTypeCodeAndOrderGreaterThanEqualAndDeletedFalseOrderByOrder(updateRequest.getTypeCode(), updateRequest.getOrder(), Sort.by(Sort.Direction.ASC, "Order"));
        if (referenceDatas != null && !referenceDatas.isEmpty()) {
            for (ReferenceData referenceData : referenceDatas) {
                boolean check = referenceDataRepository.existsByOrderAndTypeCodeAndDeletedFalse(referenceData.getOrder() + 1, updateRequest.getTypeCode());
                referenceData.setOrder(referenceData.getOrder() - 1);
                referenceDataRepository.save(referenceData);
                if (!check) break;
            }
        }
    }

    private void changeOrderFromCrate(ReferenceData updateRequest) {
        List<ReferenceData> referenceDatas = referenceDataRepository.findAllByTypeCodeAndOrderGreaterThanEqualAndDeletedFalseOrderByOrder(updateRequest.getTypeCode(), updateRequest.getOrder(), Sort.by(Sort.Direction.ASC, "Order"));
        if (referenceDatas != null && !referenceDatas.isEmpty()) {
            for (ReferenceData referenceData : referenceDatas) {
                referenceData.setOrder(referenceData.getOrder() + 1);
                boolean check = referenceDataRepository.existsByOrderAndTypeCodeAndDeletedFalse(referenceData.getOrder(), updateRequest.getTypeCode());
                referenceDataRepository.save(referenceData);
                if (!check) break;
            }
        }

    }

    private void changeOrderFromUpdate(ReferenceData oldReferenceData, ReferenceData updateRequest) {

        if (referenceDataRepository.existsByIdNotAndOrderAndTypeCodeAndDeletedFalse(updateRequest.getId(), updateRequest.getOrder(), updateRequest.getTypeCode())) {

            if (Objects.equals(oldReferenceData.getOrder(), updateRequest.getOrder())) {
                changeOrderFromCrate(updateRequest);
            } else {
                boolean isPlus = updateRequest.getOrder() > oldReferenceData.getOrder();  // jishee 1 -g 5 bolgowol true
                Integer startOrder = updateRequest.getOrder() - 1;
                int endOrder = oldReferenceData.getOrder();
                if (isPlus) {
                    startOrder = oldReferenceData.getOrder();
                    endOrder = updateRequest.getOrder() + 1;
                }

                List<ReferenceData> referenceDataList = referenceDataRepository.findAllByTypeCodeEqualsAndOrderBetweenAndDeletedFalseOrderByOrder(
                        updateRequest.getTypeCode(), startOrder, endOrder, Sort.by(isPlus ? Sort.Direction.DESC : Sort.Direction.ASC, "Order"));
                if (referenceDataList != null && !referenceDataList.isEmpty()) {
                    List<ReferenceData> newList = new ArrayList<>();

                    for (ReferenceData referenceData : referenceDataList) {
                        if (isPlus) {
                            referenceData.setOrder(referenceData.getOrder() - 1);
                        } else {
                            referenceData.setOrder(referenceData.getOrder() + 1);
                        }
                        newList.add(referenceData);
                        if (!referenceDataRepository.existsByOrderAndTypeCodeAndDeletedFalse(referenceData.getOrder(), updateRequest.getTypeCode()))
                            break;
                    }
                    referenceDataRepository.saveAll(newList);
                }
            }
        }
    }
}
