package mn.astvision.starter.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * @author MethoD
 */
public class DateUtil {

    public static LocalDateTime toLocalDate(Date in) {
        return LocalDateTime.ofInstant(in.toInstant(), ZoneId.systemDefault());
    }

    public static LocalDateTime toLocalDate(long millis) {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(millis), ZoneId.systemDefault());
    }
}
