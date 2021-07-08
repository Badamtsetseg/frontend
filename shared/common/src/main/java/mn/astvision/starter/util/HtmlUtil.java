package mn.astvision.starter.util;

import org.jsoup.parser.Parser;
import org.springframework.util.ObjectUtils;

public class HtmlUtil {

    public static String toUnicode(String html) {
        if (ObjectUtils.isEmpty(html)) {
            return null;
        }
        return MongolianTextUtil.toUnicode(Parser.unescapeEntities(html, true));
    }
}
