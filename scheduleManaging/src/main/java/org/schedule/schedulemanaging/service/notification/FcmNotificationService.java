package org.schedule.schedulemanaging.service.notification;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service("fcmNotificationService")
public class FcmNotificationService implements NotificationService {

    @Override
    @Async
    public void send(String fcmToken, String title, String content) {
        if (fcmToken == null || fcmToken.isEmpty()) {
            log.warn("FCM Token is missing. Skipping push notification.");
            return;
        }

        try {
            Message message = Message.builder()
                    .setToken(fcmToken)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(content)
                            .build())
                    .build();

            String response = FirebaseMessaging.getInstance().send(message);
            log.info("Successfully sent FCM message: {}", response);
        } catch (Exception e) {
            log.error("Failed to send FCM message to token: {}. Error: {}", fcmToken, e.getMessage());
        }
    }
}
