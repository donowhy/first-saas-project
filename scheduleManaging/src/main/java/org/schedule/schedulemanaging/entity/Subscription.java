package org.schedule.schedulemanaging.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * SaaS 구독 및 결제/정산 관리 엔티티.
 */
@Entity
@Table(name = "subscriptions")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private Plan plan; // FREE, PRO, BUSINESS

    @Enumerated(EnumType.STRING)
    private Status status; // ACTIVE, EXPIRED, CANCELED

    private LocalDateTime nextBillingDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum Plan {
        FREE, PRO, BUSINESS
    }

    public enum Status {
        ACTIVE, EXPIRED, CANCELED
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
