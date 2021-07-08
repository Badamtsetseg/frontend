package mn.astvision.starter.util;

import javax.servlet.http.HttpServletRequest;

/**
 * @author MethoD
 */
public class RequestIpUtil {

    public static String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
