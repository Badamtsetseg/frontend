package mn.astvision.starter.util.jackson;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author digz6666
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize(using = BytesSerializer.class)
@JsonDeserialize(using = BytesDeserializer.class)
public class Bytes {
    private byte[] bytes;
}
