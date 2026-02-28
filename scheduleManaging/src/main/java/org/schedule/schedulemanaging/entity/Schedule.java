package org.schedule.schedulemanaging.entity;

import jakarta.persistence.*;
import lombok.*;
import org.schedule.schedulemanaging.common.exception.BaseException;
import org.schedule.schedulemanaging.common.exception.ErrorCode;

import java.time.LocalDateTime;

/**
 * 일정 관리 엔티티. 
 * SaaS는 멀티 테넌트 환경이므로 반드시 작성자(User)를 매핑하여 데이터 격리 보장.
 */
@Entity
@Table(name = "schedules", indexes = {
    @Index(name = "idx_schedule_org_time", columnList = "organization_id, startTime, endTime"),
    @Index(name = "idx_schedule_instructor", columnList = "instructor_id")
})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    private int maxCapacity;
    private int currentParticipants;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void addParticipant() {
        if (this.currentParticipants >= this.maxCapacity) {
            throw new BaseException(ErrorCode.SCHEDULE_FULL);
        }
        this.currentParticipants++;
    }
}
