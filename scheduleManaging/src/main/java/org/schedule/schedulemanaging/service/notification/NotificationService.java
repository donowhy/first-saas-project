package org.schedule.schedulemanaging.service.notification;

/**
 * 알림 발송 공통 인터페이스. (확장성 고려)
 */
public interface NotificationService {
    void send(String to, String title, String content);
}
