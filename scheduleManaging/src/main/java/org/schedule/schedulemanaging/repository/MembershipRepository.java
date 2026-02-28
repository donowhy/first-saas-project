package org.schedule.schedulemanaging.repository;

import jakarta.persistence.LockModeType;
import org.schedule.schedulemanaging.entity.Membership;
import org.schedule.schedulemanaging.entity.Organization;
import org.schedule.schedulemanaging.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT m FROM Membership m WHERE m.user = :user AND m.organization = :org AND m.expiryDate >= CURRENT_DATE")
    Optional<Membership> findActiveMembershipWithLock(@Param("user") User user, @Param("org") Organization org);
}
