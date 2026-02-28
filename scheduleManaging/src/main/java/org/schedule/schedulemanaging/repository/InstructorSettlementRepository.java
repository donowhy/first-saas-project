package org.schedule.schedulemanaging.repository;

import org.schedule.schedulemanaging.entity.InstructorSettlement;
import org.schedule.schedulemanaging.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorSettlementRepository extends JpaRepository<InstructorSettlement, Long> {
}
