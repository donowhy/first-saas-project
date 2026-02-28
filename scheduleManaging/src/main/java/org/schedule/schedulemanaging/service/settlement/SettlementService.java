package org.schedule.schedulemanaging.service.settlement;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.schedule.schedulemanaging.entity.Subscription;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.schedule.schedulemanaging.service.notification.NotificationService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * SaaS 정산 및 결제 처리 로직.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SettlementService {

    private final UserRepository userRepository;
    @Qualifier("alimtalkNotificationService") private final NotificationService alimtalkService;
    @Qualifier("emailNotificationService") private final NotificationService emailService;

    /**
     * 정산(결제 성공) 시 처리 로직.
     */
    @Transactional
    public void processSettlement(String email, Subscription.Plan plan) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        log.info("Processing settlement for user: {}, Plan: {}", email, plan);

        // 1. 결제 정보 검증 및 DB 업데이트 (Subscription 엔티티 등)
        // 2. 알림톡 발송
        alimtalkService.send(email, "[SaaS] 결제 완료", "고객님, " + plan + " 요금제 결제가 완료되었습니다.");
        // 3. 이메일 발송
        emailService.send(email, "[SaaS] 결제 영수증", "회원님의 서비스 이용 정산이 완료되었습니다. 자세한 내역은 대시보드에서 확인하세요.");
    }
}
