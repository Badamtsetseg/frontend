package mn.astvision.starter.model.systemconfig;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
@NoArgsConstructor
public class SystemKeyValue {

    @Id
    private String key;
    private String value;

    private LocalDateTime createdDate;
    private LocalDateTime expiryDate;

    public SystemKeyValue(String key) {
        this.key = key;
    }
}
