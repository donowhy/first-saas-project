package org.schedule.schedulemanaging.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "uk_schedule_member", columnNames = {"schedule_id", "member_id"})
})
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private User member;

    private LocalDateTime enrolledAt;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus attendanceStatus;

    public enum AttendanceStatus {
        ATTENDED, ABSENT, PENDING
    }

    public void updateAttendance(AttendanceStatus status) {
        this.attendanceStatus = status;
    }
}
