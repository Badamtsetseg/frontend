package mn.astvision.starter.util;

/**
 * @author MethoD
 */
public class MongolianTextUtil {

    private static final int[] MN_LETTER = new int[]{1040, 1041, 1042, 1043, 1044,
            1045, 1025, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054,
            1256, 1055, 1056, 1057, 1058, 1059, 1198, 1060, 1061, 1062, 1063,
            1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074,
            1075, 1076, 1077, 1105, 1078, 1079, 1080, 1081, 1082, 1083, 1084,
            1085, 1086, 1257, 1087, 1088, 1089, 1090, 1091, 1199, 1092, 1093,
            1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103};
    private static final String[] LATIN_LETTER = new String[]{"A", "B", "V", "G", "D",
            "YE", "YO", "J", "Z", "I", "I", "K", "L", "M", "N", "O", "U", "P",
            "R", "S", "T", "U", "U", "F", "KH", "TS", "CH", "SH", "SH", "I",
            "Y", "I", "E", "YU", "YA", "a", "b", "v", "g", "d", "ye", "yo",
            "j", "z", "i", "i", "k", "l", "m", "n", "o", "u", "p", "r", "s",
            "t", "u", "u", "f", "kh", "ts", "ch", "sh", "sh", "i", "y", "i",
            "e", "yu", "ya"};

    public static String toLatin(String input) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            char codeStr = input.charAt(i);
            int bool = 0;
            int j = 0;
            while (j < 70 && bool == 0) {
                if (codeStr == MN_LETTER[j]) {
                    result.append(LATIN_LETTER[j]);
                    bool = 1;
                }
                j++;
            }
            if (bool == 0) {
                result.append(input.charAt(i));
            }
        }
        return result.toString();
    }

    public static String toUnicode(String input) {
        StringBuilder output = new StringBuilder();
        try {
            if (input != null && input.length() > 0) {
                for (int i = 0; i < input.length(); i++) {
                    output.append(toUnicode(input.charAt(i)));
                }
            }
        } catch (Exception e) {
        }
        return output.toString();
    }

    public static char toUnicode(char input) {
        if (input == 168) {
            return 1025; // Ё
        } else if (input == 170) {
            return 1256; // Ө
        } else if (input == 175) {
            return 1198; // Ү
        } else if (input == 184) {
            return 1105; // ё
        } else if (input == 186) {
            return 1257; // ө
        } else if (input == 191) {
            return 1199; // ү
        }
//        else if(input == 1028) {
//            return 1256;
//        } else if(input == 1031) {
//            return 1198;
//        } else if(input == 1108) {
//            return 1257;
//        } else if(input == 1111) {
//            return 1199;
//        }
        else if (192 <= input && input <= 255) {
            return (char) (input + 848);
        } else {
            return input;
        }
    }
}
