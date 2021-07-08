package mn.astvision.starter.model.enums;

import java.util.Objects;

/**
 * @author naba
 */
public enum LocationType {

    NIISLEL("Нийслэл", "Нийслэл"),
    AIMAG("Аймаг", "Аймгийн төв"),
    SOUM("Сум", "Сум"),
    BAG("Баг", "Баг");

    String value;
    String description;

    LocationType(String value, String description) {
        this.value = value;
        this.description = description;
    }

    public static LocationType fromString(String input) {
        LocationType locationType = null;
        try {
            locationType = LocationType.valueOf(input);
        } catch (NullPointerException | IllegalArgumentException e) {
        }
        return locationType;
    }

    public static LocationType fromDescription(String description) {
        LocationType res = null;
        try {
            for (LocationType locationType : LocationType.values()) {
                if (Objects.equals(locationType.description, description)) {
                    res = locationType;
                    break;
                }
            }
        } catch (NullPointerException | IllegalArgumentException e) {
        }
        return res;
    }

    public String getDescription() {
        return description;
    }
}
