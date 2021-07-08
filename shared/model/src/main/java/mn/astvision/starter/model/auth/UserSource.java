package mn.astvision.starter.model.auth;

import lombok.Getter;

@Getter
public enum UserSource {

    EMAIL("Email", "#44c9e8");
//    APPLE("Apple", "#A2AAAD"),
//    FIREBASE("Firebase", "#FFE091"),
//    FACEBOOK("Facebook", "#5C7099"),
//    GOOGLE("Google", "#E37069");

    private final String name;
    private final String color;

    UserSource(String name, String color) {
        this.name = name;
        this.color = color;
    }
}
