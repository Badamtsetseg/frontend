package mn.astvision.starter.util.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.Base64;

/**
 * @author digz6666
 */
public class BytesSerializer extends StdSerializer<Bytes> {

    private static final long serialVersionUID = -5510353102817291511L;

    public BytesSerializer() {
        super(Bytes.class);
    }

    @Override
    public void serialize(Bytes value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeString(new String(Base64.getEncoder().encode(value.getBytes())));
    }
}
