package mn.astvision.starter.repository.reference;

import mn.astvision.starter.model.reference.ReferenceData;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferenceDataRepository extends MongoRepository<ReferenceData, String> {

    long countByTypeCodeAndAndDeletedFalse(String typeCode);

    @Nullable
    boolean existsByOrderAndTypeCodeAndDeletedFalse(Integer order, String typeCode);

    @Nullable
    boolean existsByIdNotAndOrderAndTypeCodeAndDeletedFalse(String id, Integer order, String typeCode);

    List<ReferenceData> findAllByTypeCodeAndDeletedFalseOrderByOrder(String typeCode);

    List<ReferenceData> findAllByTypeCodeAndOrderGreaterThanEqualAndDeletedFalseOrderByOrder(String typeCode, Integer order, Sort sort);

    List<ReferenceData> findAllByTypeCodeEqualsAndOrderBetweenAndDeletedFalseOrderByOrder(String typeId, Integer startOrder, Integer endOrder, Sort sort);

    List<ReferenceData> findAllByTypeCodeEqualsAndNameContainingAndDeletedFalse(String typeCode, String name);

    List<ReferenceData> findAllByIdIn(List<String> ids);
}

