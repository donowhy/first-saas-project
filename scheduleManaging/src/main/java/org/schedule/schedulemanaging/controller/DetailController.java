package org.schedule.schedulemanaging.controller;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.response.ApiResponse;
import org.schedule.schedulemanaging.dto.schedule.ScheduleResponse;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.schedule.schedulemanaging.repository.ScheduleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/details")
@RequiredArgsConstructor
public class DetailController {

    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;

    // 특정 멤버의 모든 수업 예약 내역 조회
    @GetMapping("/member/{id}/schedules")
    public ApiResponse<List<ScheduleResponse>> getMemberSchedules(@PathVariable Long id) {
        return ApiResponse.success(
            scheduleRepository.findAllByMemberId(id).stream()
                .map(ScheduleResponse::from)
                .collect(Collectors.toList())
        );
    }

    // 특정 강사의 상세 정보 및 담당 멤버 수 조회
    @GetMapping("/instructor/{id}")
    public ApiResponse<Object> getInstructorDetail(@PathVariable Long id) {
        User instructor = userRepository.findById(id).orElseThrow();
        long memberCount = userRepository.countByInstructorId(id);
        
        return ApiResponse.success(java.util.Map.of(
            "instructor", instructor,
            "memberCount", memberCount
        ));
    }
}
