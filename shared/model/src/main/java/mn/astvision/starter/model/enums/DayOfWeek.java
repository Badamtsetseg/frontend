package mn.astvision.starter.model.enums;

import java.util.ArrayList;
import java.util.List;

/**
 * @author naba
 */
public enum DayOfWeek {

    MONDAY("Monday", "Даваа"),
    TUESDAY("Tuesday", "Мягмар"),
    WEDNESDAY("Wednesday", "Лхагва"),
    THURSDAY("Thursday", "Пүрэв"),
    FRIDAY("Friday", "Баасан"),
    SATURDAY("Saturday", "Бямба"),
    SUNDAY("Sunday", "Ням");

    String value;
    String desc;

    DayOfWeek(String value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public static DayOfWeek fromString(String input) {
        DayOfWeek dayOfWeek = null;
        try {
            dayOfWeek = DayOfWeek.valueOf(input);
        } catch (NullPointerException | IllegalArgumentException e) {
        }
        return dayOfWeek;
    }

    public static List<DayOfWeek> getList() {
        List<DayOfWeek> list = new ArrayList<>();
        list.add(MONDAY);
        list.add(TUESDAY);
        list.add(WEDNESDAY);
        list.add(THURSDAY);
        list.add(FRIDAY);
        list.add(SATURDAY);
        list.add(SUNDAY);
        return list;
    }
}
