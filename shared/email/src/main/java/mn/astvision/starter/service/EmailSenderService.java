package mn.astvision.starter.service;

import mn.astvision.starter.util.EmailAddressUtil;
import mn.astvision.starter.repository.EmailRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

/**
 * @author MethoD
 */
@Service
public class EmailSenderService {

    private static final Logger log = LoggerFactory.getLogger("emailLogger");

    @Autowired
    public JavaMailSender mailSender;

    @Autowired
    private EmailTemplateService emailTemplateService;

    @Autowired
    private EmailRepository emailRepository;

    public boolean send(String from, String fromName, String to, String subject, String content, List<File> attachments) {
//        log.debug("Sending email: {from: " + from + ", to: " + to
//                + ", subject: " + subject + ", content: " + content + ", attachments: " + attachments + " }");
        boolean result = false;

        if (EmailAddressUtil.isValid(to)) {
            try {
                MimeMessagePreparator messagePreparator = mimeMessage -> {
                    MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
                    messageHelper.setFrom(from, fromName);
                    messageHelper.setTo(to);
                    messageHelper.setSubject(subject);
                    messageHelper.setText(content, true); // html
                    if (attachments != null) {
                        for (File file : attachments) {
                            messageHelper.addAttachment(file.getName(), file);
                        }
                    }
                };
                mailSender.send(messagePreparator);
                result = true;
            } catch (MailException e) {
                log.error(e.getMessage(), e);
            }
        } else {
            log.error("Invalid email address: " + to);
        }

        return result;
    }
}
