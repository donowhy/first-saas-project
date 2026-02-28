package org.schedule.schedulemanaging.controller;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.response.ApiResponse;
import org.schedule.schedulemanaging.entity.Organization;
import org.schedule.schedulemanaging.repository.OrganizationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {

    private final OrganizationRepository organizationRepository;

    // 사용자가 참여 중인 모임(워크스페이스) 목록 조회
    @GetMapping
    public ApiResponse<List<Organization>> getMyWorkspaces() {
        // 실제로는 User-Organization 매핑 테이블이 필요하지만, 현재는 전체 목록을 반환하도록 구성
        return ApiResponse.success(organizationRepository.findAll());
    }

    // 새 모임 생성
    @PostMapping
    public ApiResponse<Organization> createWorkspace(@RequestBody String name) {
        Organization org = Organization.builder().name(name).build();
        return ApiResponse.success(organizationRepository.save(org));
    }
}
