package mn.astvision.starter.auth;

import org.passay.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PasswordUtil {

    private final PasswordValidator validator = new PasswordValidator(List.of(
            new LengthRule(8, 30),
            new CharacterRule(EnglishCharacterData.UpperCase, 1),
            new CharacterRule(EnglishCharacterData.LowerCase, 1),
            new CharacterRule(EnglishCharacterData.Digit, 1),
//            new CharacterRule(EnglishCharacterData.Special, 1),
            new WhitespaceRule()));

    public boolean isValid(String password) {
        RuleResult ruleResult = validator.validate(new PasswordData(password));
        return ruleResult.isValid();
    }
}
