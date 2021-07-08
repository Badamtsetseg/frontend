package mn.astvision.starter.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class FileData implements Serializable {

    private String uid;
    private String name;
    private String url;
    private String status = "done";

    public FileData(String url) {
        this.url = url;
    }
}
