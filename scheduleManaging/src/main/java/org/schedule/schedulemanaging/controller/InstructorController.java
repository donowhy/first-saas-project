package org.schedule.schedulemanaging.controller;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.response.ApiResponse;
import org.schedule.schedulemanaging.dto.instructor.InstructorRequest;
import org.schedule.schedulemanaging.dto.instructor.InstructorResponse;
import org.schedule.schedulemanaging.service.InstructorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@RequiredArgsConstructor
public class InstructorController {

    private final InstructorService instructorService;

    @GetMapping
    public ApiResponse<List<InstructorResponse>> getAllInstructors() {
        return ApiResponse.success(instructorService.getAllInstructors());
    }

    @PostMapping
    public ApiResponse<InstructorResponse> createInstructor(@RequestBody InstructorRequest request) {
        return ApiResponse.success(instructorService.createInstructor(request));
    }
}
