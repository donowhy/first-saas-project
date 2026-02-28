package org.schedule.schedulemanaging.service.enrollment;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.exception.BaseException;
import org.schedule.schedulemanaging.common.exception.ErrorCode;
import org.schedule.schedulemanaging.entity.Enrollment;
import org.schedule.schedulemanaging.entity.Membership;
import org.schedule.schedulemanaging.entity.Schedule;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.EnrollmentRepository;
import org.schedule.schedulemanaging.repository.MembershipRepository;
import org.schedule.schedulemanaging.repository.ScheduleRepository;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.schedule.schedulemanaging.service.notification.NotificationService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final ScheduleRepository scheduleRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;
    
    @Qualifier("fcmNotificationService") 
    private final NotificationService fcmService;

    @Transactional
    public void enroll(String email, Long scheduleId) {
        User member = userRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(ErrorCode.INVALID_CREDENTIALS));

        Schedule schedule = scheduleRepository.findByIdWithLock(scheduleId)
                .orElseThrow(() -> new BaseException(ErrorCode.SCHEDULE_NOT_FOUND));

        if (!schedule.getOrganization().equals(member.getOrganization())) {
            throw new BaseException(ErrorCode.ACCESS_DENIED_ORG);
        }

        if (enrollmentRepository.existsByScheduleAndMember(schedule, member)) {
            throw new BaseException(ErrorCode.ALREADY_ENROLLED);
        }

        Membership membership = membershipRepository.findActiveMembershipWithLock(member, schedule.getOrganization())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBERSHIP_NOT_FOUND));

        schedule.addParticipant();
        membership.usePass();

        enrollmentRepository.save(Enrollment.builder()
                .schedule(schedule)
                .member(member)
                .enrolledAt(LocalDateTime.now())
                .attendanceStatus(Enrollment.AttendanceStatus.PENDING)
                .build());

        fcmService.send(member.getFcmToken(), "예약 완료", schedule.getTitle() + " 수업 예약이 완료되었습니다.");
        fcmService.send(schedule.getInstructor().getFcmToken(), "신규 예약 발생", member.getName() + "님이 수업에 참여합니다.");
    }
}
