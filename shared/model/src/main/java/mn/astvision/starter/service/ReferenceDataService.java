package mn.astvision.starter.service;

import mn.astvision.starter.dao.reference.ReferenceDataDao;
import mn.astvision.starter.model.reference.ReferenceData;
import mn.astvision.starter.model.reference.ReferenceType;
import mn.astvision.starter.repository.reference.ReferenceTypeRepository;
import mn.astvision.starter.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

@Component
public class ReferenceDataService {

    @Autowired
    private ReferenceDataDao referenceDataDAO;

    @Autowired
    private ReferenceTypeRepository referenceTypeRepository;

    @Autowired
    private UserService userService;

    public Iterable<ReferenceData> list(String typeCode, String description, Integer order, String name, Pageable pageable) {
        Iterable<ReferenceData> listData = referenceDataDAO.list(typeCode, description, order, name, pageable);

        for (ReferenceData referenceData : listData) {
            fillRelatedData(referenceData);
        }

        return listData;
    }

    private void fillRelatedData(ReferenceData referenceData) {
        if (referenceData.getCreatedBy() != null) {
            referenceData.setCreatedUserFullName(userService.getFullNameById(referenceData.getCreatedBy()));
        }

        if (!ObjectUtils.isEmpty(referenceData.getTypeCode())) {
            ReferenceType type = referenceTypeRepository.findByCodeAndDeletedFalse(referenceData.getTypeCode());
            if (type != null) {
                referenceData.setTypeName(type.getName());
            }
        }
    }
}
