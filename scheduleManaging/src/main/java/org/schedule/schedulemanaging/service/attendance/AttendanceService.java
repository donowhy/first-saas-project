package org.schedule.schedulemanaging.service.attendance;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.exception.BaseException;
import org.schedule.schedulemanaging.common.exception.ErrorCode;
import org.schedule.schedulemanaging.dto.attendance.ParticipantResponse;
import org.schedule.schedulemanaging.entity.Enrollment;
import org.schedule.schedulemanaging.entity.Schedule;
import org.schedule.schedulemanaging.repository.EnrollmentRepository;
import org.schedule.schedulemanaging.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttendanceService {

    private final ScheduleRepository scheduleRepository;
    private final EnrollmentRepository enrollmentRepository;

    public List<ParticipantResponse> getParticipants(String instructorEmail, Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new BaseException(ErrorCode.SCHEDULE_NOT_FOUND));

        if (!schedule.getInstructor().getEmail().equals(instructorEmail)) {
            throw new BaseException(ErrorCode.ACCESS_DENIED_ORG);
        }

        return enrollmentRepository.findAllBySchedule(schedule).stream()
                .map(ParticipantResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAttendance(String instructorEmail, Long enrollmentId, Enrollment.AttendanceStatus status) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new BaseException(ErrorCode.ENROLLMENT_NOT_FOUND));

        if (!enrollment.getSchedule().getInstructor().getEmail().equals(instructorEmail)) {
            throw new BaseException(ErrorCode.ACCESS_DENIED_ORG);
        }

        enrollment.updateAttendance(status);
    }
}
