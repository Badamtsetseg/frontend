package mn.astvision.starter.util;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.parser.Parser;
import org.junit.Ignore;
import org.junit.Test;

//import org.apache.commons.text.StringEscapeUtils;
//import org.apache.commons.text.translate.AggregateTranslator;
//import org.apache.commons.text.translate.CharSequenceTranslator;
//import org.apache.commons.text.translate.EntityArrays;
//import org.apache.commons.text.translate.LookupTranslator;

@Ignore
@Slf4j
public class MongolianTextUtilTest {

    @Test
    public void testConvert() {
//        char[] chars = new char[]{
//                1025,
//                1256,
//                1198,
//                1105,
//                1257,
//                1199
//        };
//        for (char ch : chars) {
//            log.info((int) ch + ch + " -> " + MongolianTextUtil.toUnicode(ch));
//        }
//        log.info(MongolianTextUtil.toUnicode("ÀÁÂÃÄÅ¨ÆÇÈÉÊËÌÍÎªÏÐÑÒÓ¯ÔÕÖ×ØÙÚÛÜÝÞßàáâãäå¸æçèéêëìíîºïðñòó¿ôõö÷øùúûüýþÿ"));

        String text = MongolianTextUtil.toUnicode(Parser.unescapeEntities("<p>&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&uml;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;</p>", true));
        log.info(text);

//        CharSequenceTranslator trans = new AggregateTranslator(new LookupTranslator(EntityArrays.ISO8859_1_ESCAPE));;
//        CharSequenceTranslator trans2 = StringEscapeUtils.ESCAPE_HTML4.with(new LookupTranslator(EntityArrays.ISO8859_1_ESCAPE));
//        log.info(trans.translate(text));
    }
}
