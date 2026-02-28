package org.schedule.schedulemanaging.controller;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.response.ApiResponse;
import org.schedule.schedulemanaging.dto.member.MemberRequest;
import org.schedule.schedulemanaging.dto.member.MemberResponse;
import org.schedule.schedulemanaging.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ApiResponse<List<MemberResponse>> getAllMembers() {
        return ApiResponse.success(memberService.getAllMembers());
    }

    @PostMapping
    public ApiResponse<MemberResponse> createMember(@RequestBody MemberRequest request) {
        return ApiResponse.success(memberService.createMember(request));
    }
}
