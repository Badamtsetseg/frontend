package mn.astvision.starter.jackson;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.TimeZone;

/**
 * @author MethoD
 */
public class TimestampDeserializer extends JsonDeserializer<LocalDateTime> {

    @Override
    public LocalDateTime deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        Long value = parser.readValueAs(Long.class);
        return LocalDateTime.ofInstant(Instant.ofEpochSecond(value), TimeZone.getDefault().toZoneId());
    }
}
