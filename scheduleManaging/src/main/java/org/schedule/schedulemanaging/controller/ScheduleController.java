package org.schedule.schedulemanaging.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.response.ApiResponse;
import org.schedule.schedulemanaging.dto.schedule.ScheduleRequest;
import org.schedule.schedulemanaging.dto.schedule.ScheduleResponse;
import org.schedule.schedulemanaging.service.ScheduleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * 일정 관리 REST 컨트롤러.
 */
@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ApiResponse<Long>> createSchedule(Principal principal, @Valid @RequestBody ScheduleRequest request) {
        Long id = scheduleService.createSchedule(principal.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(id));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ScheduleResponse>>> getSchedules(Principal principal, 
                                                                           @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(scheduleService.getSchedules(principal.getName(), pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ScheduleResponse>> getSchedule(Principal principal, @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(scheduleService.getSchedule(principal.getName(), id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> updateSchedule(Principal principal, 
                                                            @PathVariable Long id, 
                                                            @Valid @RequestBody ScheduleRequest request) {
        scheduleService.updateSchedule(principal.getName(), id, request);
        return ResponseEntity.ok(ApiResponse.success("일정이 수정되었습니다."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSchedule(Principal principal, @PathVariable Long id) {
        scheduleService.deleteSchedule(principal.getName(), id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
