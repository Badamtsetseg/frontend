package mn.astvision.starter.util;

import java.time.format.DateTimeFormatter;

/**
 * @author Batulai
 */
public class GlobalDateFormat {

    public static DateTimeFormatter DATE_TIME_ONLY = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
    public static DateTimeFormatter DATE_TIME = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    public static DateTimeFormatter DATE = DateTimeFormatter.ofPattern("yyyy/MM/dd");
    public static DateTimeFormatter TIME = DateTimeFormatter.ofPattern("HH:mm:ss");
}
