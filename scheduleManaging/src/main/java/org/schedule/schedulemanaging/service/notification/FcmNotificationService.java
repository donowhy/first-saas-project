package org.schedule.schedulemanaging.service.notification;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service("fcmNotificationService")
public class FcmNotificationService implements NotificationService {

    @Override
    @Async
    public void send(String fcmToken, String title, String content) {
        if (fcmToken == null || fcmToken.isEmpty()) return;
        log.info("FCM Push sent to [{}]: {} - {}", fcmToken, title, content);
    }
}
