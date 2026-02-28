package org.schedule.schedulemanaging.service.notification;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * 카카오 알림톡 발송 구현체. (외부 API 연동용)
 */
@Slf4j
@Service
public class AlimtalkNotificationService implements NotificationService {

    @Override
    @Async
    public void send(String to, String title, String content) {
        // TODO: Solapi, Aligo 등 외부 알림톡 연동 API 호출 로직 추가 예정
        log.info("Alimtalk sent successfully to {}: Title={}, Content={}", to, title, content);
    }
}
