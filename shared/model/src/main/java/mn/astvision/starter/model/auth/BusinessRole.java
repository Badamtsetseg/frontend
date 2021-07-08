package mn.astvision.starter.model.auth;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import mn.astvision.starter.model.enums.ApplicationRole;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

/**
 * @author MethoD
 */
@Document
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class BusinessRole implements Serializable {

    public static final String CUSTOMER = "CUSTOMER";
    @Id
    @NonNull
    private String role;

    private String name;

    private List<ApplicationRole> applicationRoles;

    @Transient
    public String getKey() {
        return this.role;
    }
}
