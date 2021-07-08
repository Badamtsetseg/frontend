package mn.astvision.starter.model.enums;

/**
 * @author MethoD
 */
public enum ApplicationRole {

    ROLE_DEFAULT, // view and update profile, upload a file

    ROLE_MANAGE_DEFAULT, // manage-рүү нэвтрэх эрх
    ROLE_BUSINESS_ROLE_MANAGE,

    ROLE_USER_VIEW,
    ROLE_USER_MANAGE,

    ROLE_DEVICE_TOKEN_VIEW,
    ROLE_PUSH_NOTIFICATION_VIEW,
    ROLE_PUSH_NOTIFICATION_MANAGE,

    ROLE_REFERENCE_TYPE_MANAGE,
    ROLE_REFERENCE_DATA_MANAGE,
    ROLE_ARTICLE_MANAGE,
    ROLE_FAQ_MANAGE,
    ROLE_COUNTRY_MANAGE,

    ROLE_CUSTOMER;

    public static ApplicationRole[] getDefaultRoles() {
        return new ApplicationRole[]{ROLE_DEFAULT};
    }

    public static ApplicationRole fromString(String input) {
        ApplicationRole applicationRole = null;
        try {
            applicationRole = ApplicationRole.valueOf(input);
        } catch (NullPointerException | IllegalArgumentException e) {
        }
        return applicationRole;
    }
}
