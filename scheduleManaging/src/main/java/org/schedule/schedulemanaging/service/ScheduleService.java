package org.schedule.schedulemanaging.service;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.exception.BaseException;
import org.schedule.schedulemanaging.common.exception.ErrorCode;
import org.schedule.schedulemanaging.dto.schedule.ScheduleRequest;
import org.schedule.schedulemanaging.dto.schedule.ScheduleResponse;
import org.schedule.schedulemanaging.entity.Schedule;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.ScheduleRepository;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 일정 관리 비즈니스 로직.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long createSchedule(String email, ScheduleRequest request) {
        if (!request.isValidTime()) {
            throw new BaseException(ErrorCode.INVALID_TIME_RANGE);
        }

        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(ErrorCode.INVALID_CREDENTIALS));

        Schedule schedule = Schedule.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .maxCapacity(request.getMaxCapacity())
                .currentParticipants(0)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .instructor(instructor)
                .organization(instructor.getOrganization())
                .build();

        return scheduleRepository.save(schedule).getId();
    }

    public Page<ScheduleResponse> getSchedules(String email, Pageable pageable) {
        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(ErrorCode.INVALID_CREDENTIALS));

        return scheduleRepository.findAllByInstructor(instructor, pageable)
                .map(ScheduleResponse::from);
    }

    public ScheduleResponse getSchedule(String email, Long id) {
        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(ErrorCode.INVALID_CREDENTIALS));

        Schedule schedule = scheduleRepository.findByIdAndInstructor(id, instructor)
                .orElseThrow(() -> new BaseException(ErrorCode.SCHEDULE_NOT_FOUND));

        return ScheduleResponse.from(schedule);
    }

    @Transactional
    public void updateSchedule(String email, Long id, ScheduleRequest request) {
        if (!request.isValidTime()) {
            throw new BaseException(ErrorCode.INVALID_TIME_RANGE);
        }

        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(ErrorCode.INVALID_CREDENTIALS));

        Schedule schedule = scheduleRepository.findByIdAndInstructor(id, instructor)
                .orElseThrow(() -> new BaseException(ErrorCode.SCHEDULE_NOT_FOUND));

        schedule = Schedule.builder()
                .id(schedule.getId())
                .title(request.getTitle())
                .content(request.getContent())
                .maxCapacity(request.getMaxCapacity())
                .currentParticipants(schedule.getCurrentParticipants())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .instructor(instructor)
                .organization(schedule.getOrganization())
                .createdAt(schedule.getCreatedAt())
                .build();
        
        scheduleRepository.save(schedule);
    }

    @Transactional
    public void deleteSchedule(String email, Long id) {
        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(ErrorCode.INVALID_CREDENTIALS));

        Schedule schedule = scheduleRepository.findByIdAndInstructor(id, instructor)
                .orElseThrow(() -> new BaseException(ErrorCode.SCHEDULE_NOT_FOUND));

        scheduleRepository.delete(schedule);
    }
}
