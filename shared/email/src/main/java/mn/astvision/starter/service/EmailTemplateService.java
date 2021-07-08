package mn.astvision.starter.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * @author naba
 */
@Service
public class EmailTemplateService {

    @Autowired
    private TemplateEngine templateEngine;

    public String getPasswordReset(String resetCode, int expiryMinute, String unsubscribeLink) {
        Context context = new Context();
        context.setVariable("resetCode", resetCode);
        context.setVariable("expiryMinute", expiryMinute);
        context.setVariable("unsubscribeLink", unsubscribeLink);
        return templateEngine.process("passwordReset", context);
    }

    public String getRegistrationEmail(String activateLink, int expiryHour, String unsubscribeLink) {
        Context context = new Context();
        context.setVariable("activateLink", activateLink);
        context.setVariable("expiryHour", expiryHour);
        context.setVariable("unsubscribeLink", unsubscribeLink);
        return templateEngine.process("registration", context);
    }

//    public String main(String content, String link, String comment) {
//        Context context = new Context();
//        context.setVariable("content", content);
//        context.setVariable("link", link);
//        context.setVariable("comment", comment);
//        return templateEngine.process("main", context);
//    }
//
//    public String withAttachment(String content, String link, String fileUrl) {
//        Context context = new Context();
//        context.setVariable("content", content);
//        context.setVariable("fileUrl", fileUrl);
//        return templateEngine.process("withAttachment", context);
//    }
}
