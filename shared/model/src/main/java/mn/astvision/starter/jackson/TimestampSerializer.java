package mn.astvision.starter.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.NumberSerializers;

import java.io.IOException;

/**
 * @author MethoD
 */
public class TimestampSerializer extends NumberSerializers.LongSerializer {

    public TimestampSerializer() {
        super(Long.class);
    }

    @Override
    public void serialize(Object value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeString("" + value);
    }
}
