package org.schedule.schedulemanaging.entity;

import jakarta.persistence.*;
import lombok.*;
import org.schedule.schedulemanaging.common.exception.BaseException;
import org.schedule.schedulemanaging.common.exception.ErrorCode;
import java.time.LocalDate;

@Entity
@Table(name = "memberships", indexes = {
    @Index(name = "idx_membership_user_org_expiry", columnList = "user_id, organization_id, expiryDate")
})
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    private int totalCount;
    private int remainingCount;
    private LocalDate expiryDate;

    public void usePass() {
        if (this.expiryDate.isBefore(LocalDate.now())) {
            throw new BaseException(ErrorCode.MEMBERSHIP_EXPIRED);
        }
        if (this.remainingCount <= 0) {
            throw new BaseException(ErrorCode.INSUFFICIENT_PASSES);
        }
        this.remainingCount--;
    }
}
