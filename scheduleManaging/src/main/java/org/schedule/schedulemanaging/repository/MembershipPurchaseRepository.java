package org.schedule.schedulemanaging.repository;

import org.schedule.schedulemanaging.entity.MembershipPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface MembershipPurchaseRepository extends JpaRepository<MembershipPurchase, Long> {
    
    @Query("SELECT SUM(m.amount) FROM MembershipPurchase m WHERE m.organization.id = :orgId AND m.purchasedAt BETWEEN :start AND :end")
    Long sumAmountByOrganizationAndDate(@Param("orgId") Long orgId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
