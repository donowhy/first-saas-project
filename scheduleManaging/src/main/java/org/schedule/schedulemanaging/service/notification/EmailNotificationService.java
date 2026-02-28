package org.schedule.schedulemanaging.service.notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.schedule.schedulemanaging.common.exception.BaseException;
import org.schedule.schedulemanaging.common.exception.ErrorCode;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * 이메일 발송 구현체.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailNotificationService implements NotificationService {

    private final JavaMailSender mailSender;

    @Override
    @Async // 알림 발송은 비동기로 처리하여 사용자 응답 속도 향상 (OOM 방지를 위해 추후 TaskExecutor 설정 권장)
    public void send(String to, String title, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(title);
            message.setText(content);
            mailSender.send(message);
            log.info("Email sent successfully to {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to {}: ", to, e);
            throw new BaseException(ErrorCode.NOTIFICATION_FAILED);
        }
    }
}
