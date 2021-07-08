package mn.astvision.starter.util;

//import java.io.UnsupportedEncodingException;
//import javax.xml.bind.DatatypeConverter;

/**
 * @author MethoD
 */
public class TextUtil {

    private static final char[] HEX_ARRAY = "0123456789ABCDEF".toCharArray();

    /*public static String bytes2String(byte[] bytes) {
        StringBuilder stringBuffer = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            stringBuffer.append((char) bytes[i]);
        }
        return stringBuffer.toString();
    }

    public static String stringToHex(String text) throws UnsupportedEncodingException {
        return DatatypeConverter.printHexBinary(text.getBytes("UTF-8"));
    }

    public static String hexToString(String text) throws UnsupportedEncodingException {
        return new String(DatatypeConverter.parseHexBinary(text), "UTF-8");
    }*/

    public static String transliterate(String message) {
        char[] abcCyr = {' ', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'ө', 'п', 'р', 'с', 'т', 'у', 'ү', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'Ө', 'П', 'Р', 'С', 'Т', 'У', 'Ү', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')', '-', ':'};
        String[] abcLat = {" ", "a", "b", "v", "g", "d", "e", "e", "j", "z", "i", "i", "k", "l", "m", "n", "o", "u", "p", "r", "s", "t", "u", "u", "f", "h", "ts", "ch", "sh", "sch", "i", "i", "i", "e", "yu", "ya", "A", "B", "V", "G", "D", "E", "E", "J", "Z", "I", "I", "K", "L", "M", "N", "O", "U", "P", "R", "S", "T", "U", "U", "F", "H", "Ts", "Ch", "Sh", "Sh", "I", "I", "I", "E", "Yu", "Ya", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", ")", "-", ":"};
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < message.length(); i++) {
            for (int x = 0; x < abcCyr.length; x++) {
                if (message.charAt(i) == abcCyr[x]) {
                    builder.append(abcLat[x]);
                }
            }
        }
        return builder.toString();
    }

    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = HEX_ARRAY[v >>> 4];
            hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
        }
        return new String(hexChars);
    }

    public static boolean isAlphaNumeric(String text) {
        String pattern = "^[0-9a-zA-Zа-яА-ЯүөҮӨ]*$";
        return text.matches(pattern);
    }
}
