package mn.astvision.starter.util;

import lombok.extern.slf4j.Slf4j;

import java.io.File;

@Slf4j
public class FileUtil {

    public static boolean createDirectory(String filePath) {
        boolean result = false;

        File file = new File(filePath);
        if (!file.exists()) {
            result = file.mkdirs();
        } else if (file.isDirectory()) {
            result = true;
        }

        if (!result) {
            log.debug("Create directory failed: " + filePath);
        }
        return result;
    }
}
