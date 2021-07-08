package mn.astvision.starter.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFileAttributes;
import java.nio.file.attribute.PosixFilePermission;
import java.util.Iterator;
import java.util.Set;
//import org.apache.commons.io.FileUtils;

/**
 * @author MethoD
 */
public class FileUtil {

    public static boolean createDirectory(String rootPath, String folderPath) throws IOException {
        boolean result = false;

        File file = new File(rootPath + "/" + folderPath);
        if (!file.exists()) {
            file.mkdirs();
            //file.setReadable(true);
            //file.setExecutable(true);
            fixPathPermissions(rootPath, folderPath);

            result = true;
        } else if (file.isDirectory()) {
            result = true;
        }

        return result;
    }

    public static boolean createFile(String rootPath, String folderPath, String fileName, byte[] bytes) throws IOException {
        boolean result = false;

        boolean directoryCreated = createDirectory(rootPath, folderPath);
        if (directoryCreated) {
            boolean fileDeleted = false;
            File file = new File(rootPath + "/" + folderPath + "/" + fileName);
            if (file.exists()) {
                fileDeleted = file.delete();
            }

            if (!file.exists() || fileDeleted) {
                try (FileOutputStream fos = new FileOutputStream(file)) {
                    fos.write(bytes);
                }

                //file.setReadable(true);
                //file.setExecutable(true);
                fixPathPermission(rootPath + "/" + folderPath + "/" + fileName);
                result = true;
            }
        }

        return result;
    }

    public static boolean deleteFile(String filePath) throws IOException {
        File file = new File(filePath);
        if (file.exists() && file.canRead()) {
            return file.delete();
        }
        return false;
    }

    public static boolean isExist(String filePath) {
        File file = new File(filePath);
        return file.exists();
    }

    public static void fixPathPermissions(String rootPath, String folderPath) {
        Path path = Paths.get(folderPath);

        String _curPath = "" + rootPath;
        Iterator<Path> iter = path.iterator();
        while (iter.hasNext()) {
            Path _path = iter.next();
            _curPath += "/" + _path.toString();
            fixPathPermission(_curPath);
        }
    }

    public static void fixPathPermission(String pathStr) {
        try {
            Path path = Paths.get(pathStr);

            Set<PosixFilePermission> perms = Files.readAttributes(path, PosixFileAttributes.class).permissions();
            perms.add(PosixFilePermission.OWNER_WRITE);
            perms.add(PosixFilePermission.OWNER_READ);
            perms.add(PosixFilePermission.OWNER_EXECUTE);
            //perms.add(PosixFilePermission.GROUP_WRITE);
            perms.add(PosixFilePermission.GROUP_READ);
            perms.add(PosixFilePermission.GROUP_EXECUTE);
            //perms.add(PosixFilePermission.OTHERS_WRITE);
            perms.add(PosixFilePermission.OTHERS_READ);
            perms.add(PosixFilePermission.OTHERS_EXECUTE);
            Files.setPosixFilePermissions(path, perms);
        } catch (UnsupportedOperationException | IOException e) {
        }
    }

    /*public static void copyFile(String target, String destination) throws IOException {
        FileUtils.copyFile(new File(target), new File(destination));
    }*/
    /*public static String storeImageAsBase64(String encoded, String directory, String fileName) throws IOException {
        String fullFilePath = StringUtils.cleanPath(directory + "/" + fileName);

        createDirectory(directory);
        Path targetLocation = Paths.get(directory).resolve(fullFilePath);
        String tempEncoded = encoded;
        if (tempEncoded.contains(",")) {
            tempEncoded = tempEncoded.split(",")[1];
        }
        Files.write(targetLocation, Base64.getDecoder().decode(tempEncoded.getBytes(StandardCharsets.UTF_8)));

        return fullFilePath;
    }*/
}
