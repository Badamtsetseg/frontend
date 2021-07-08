package mn.astvision.starter.util.jackson;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.util.Base64;

/**
 * @author digz6666
 */
public class BytesDeserializer extends StdDeserializer<Bytes> {

    public BytesDeserializer() {
        super(Bytes.class);
    }

    @Override
    public Bytes deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = p.getCodec().readTree(p);
        String base64 = node.asText();
        return new Bytes(Base64.getDecoder().decode(base64));
    }
}
