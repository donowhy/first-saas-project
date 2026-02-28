package org.schedule.schedulemanaging.repository;

import org.schedule.schedulemanaging.entity.Enrollment;
import org.schedule.schedulemanaging.entity.Schedule;
import org.schedule.schedulemanaging.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByScheduleAndMember(Schedule schedule, User member);
    List<Enrollment> findAllBySchedule(Schedule schedule);
}
