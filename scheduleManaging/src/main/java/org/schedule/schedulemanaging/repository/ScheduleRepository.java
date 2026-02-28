package org.schedule.schedulemanaging.repository;

import jakarta.persistence.LockModeType;
import org.schedule.schedulemanaging.entity.Schedule;
import org.schedule.schedulemanaging.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    
    Page<Schedule> findAllByInstructor(User instructor, Pageable pageable);

    Optional<Schedule> findByIdAndInstructor(Long id, User instructor);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Schedule s WHERE s.id = :id")
    Optional<Schedule> findByIdWithLock(@Param("id") Long id);

    long countByInstructorAndStartTimeBetween(User instructor, LocalDateTime start, LocalDateTime end);
}
