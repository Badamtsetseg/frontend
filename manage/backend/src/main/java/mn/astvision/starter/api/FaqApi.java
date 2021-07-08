package mn.astvision.starter.api;

import lombok.extern.slf4j.Slf4j;
import mn.astvision.starter.api.request.DeleteRequest;
import mn.astvision.starter.api.request.antd.AntdPagination;
import mn.astvision.starter.api.response.antd.AntdTableDataList;
import mn.astvision.starter.dao.FaqDao;
import mn.astvision.starter.model.Faq;
import mn.astvision.starter.model.auth.User;
import mn.astvision.starter.repository.FaqRepository;
import mn.astvision.starter.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@Slf4j
@Secured("ROLE_FAQ_MANAGE")
@RestController
@RequestMapping("/api/faq")
public class FaqApi {

    @Autowired
    private FaqRepository faqRepository;

    @Autowired
    private FaqDao faqDAO;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> list(String question, String answer, Boolean visible, Boolean deleted, AntdPagination pagination) {
        AntdTableDataList<Faq> listData = new AntdTableDataList<>();

        pagination.setTotal(faqDAO.count(question, answer, visible, deleted));
        pagination.setSortParams(new String[]{"order"});
        pagination.setSortDirection(Sort.Direction.ASC);
        listData.setPagination(pagination);
        listData.setList(faqDAO.list(question, answer, visible, deleted, pagination.toPageRequest()));
        return ResponseEntity.ok(listData);
    }

    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody Faq updateRequest, Principal principal) {
        Faq faq;
        User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
        if (user == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хандах эрхгүй байна");

        if (ObjectUtils.isEmpty(updateRequest.getId())) {
            faq = new Faq();
            faq.setCreatedBy(user.getId());
            faq.setCreatedDate(LocalDateTime.now());
        } else {
            faq = faqRepository.findById(updateRequest.getId()).orElse(null);
            if (faq == null)
                return ResponseEntity.badRequest().body("Түгээмэл асуулт хариулт олдсонгүй: " + updateRequest.getId());
            faq.setModifiedBy(user.getId());
            faq.setModifiedDate(LocalDateTime.now());
        }

        faq.setQuestion(updateRequest.getQuestion());
        faq.setAnswer(updateRequest.getAnswer());
        faq.setVisible(updateRequest.isVisible());
        faq.setOrder(updateRequest.getOrder());
        faq = faqRepository.save(faq);
        return ResponseEntity.ok(faq);
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> delete(@RequestBody DeleteRequest deleteRequest, Principal principal) {
        if (ObjectUtils.isEmpty(deleteRequest.getId()))
            return ResponseEntity.badRequest().body("ID хоосон байна");

        try {
            User user = userRepository.findByUsernameAndDeletedFalse(principal.getName());
            if (user == null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Хандах эрхгүй байна");

            Faq faq = faqRepository.findById(deleteRequest.getId()).orElse(null);
            if (faq == null)
                return ResponseEntity.badRequest().body("Түгээмэл асуулт хариулт олдсонгүй: " + deleteRequest.getId());

            faq.setDeleted(true);
            faq.setModifiedBy(user.getId());
            faq.setModifiedDate(LocalDateTime.now());
            faqRepository.save(faq);
            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
