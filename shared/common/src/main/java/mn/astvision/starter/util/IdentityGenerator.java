package mn.astvision.starter.util;

import org.apache.commons.lang3.RandomStringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @author MethoD
 */
public class IdentityGenerator {

    /**
     * @param prefix
     * @param datePattern yyMMdd HHmmss.
     * @param count
     * @return
     */
    public static String generate(String prefix, String datePattern, int count) {
        StringBuilder sb = new StringBuilder(prefix.length() + datePattern.length() + count);
        sb.append(prefix);
        sb.append(DateTimeFormatter.ofPattern(datePattern).format(LocalDateTime.now()));
        sb.append(RandomStringUtils.randomNumeric(count));
        return sb.toString();
    }
}
