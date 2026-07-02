package com.ins.ins_classes_be.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String from;

    @Value("${app.mail.from-name}")
    private String fromName;

    @Async
    public void sendUserPasswordEmail(String toEmail, String name, String rawPassword) {
        try {
            String html = loadTemplate("templates/email/user-password.html", Map.of(
                    "{{name}}", name,
                    "{{email}}", toEmail,
                    "{{password}}", rawPassword
            ));

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(from, fromName);
            helper.setTo(toEmail);
            helper.setSubject("Thông tin tài khoản INS Classes của bạn");
            helper.setText(html, true);

            mailSender.send(message);
            log.info("Password email sent to {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send password email to {}: {}", toEmail, e.getMessage());
        }
    }

    private String loadTemplate(String path, Map<String, String> variables) throws Exception {
        ClassPathResource resource = new ClassPathResource(path);
        String content = resource.getContentAsString(StandardCharsets.UTF_8);
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            content = content.replace(entry.getKey(), entry.getValue());
        }
        return content;
    }
}
