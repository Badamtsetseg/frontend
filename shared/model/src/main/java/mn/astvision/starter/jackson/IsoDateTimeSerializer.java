package mn.astvision.starter.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @author MethoD
 */
public class IsoDateTimeSerializer extends LocalDateTimeSerializer {

    @Override
    public void serialize(LocalDateTime date, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeString(date.format(DateTimeFormatter.ISO_ZONED_DATE_TIME));
    }
}
