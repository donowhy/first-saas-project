package org.schedule.schedulemanaging.service;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.dto.member.MemberRequest;
import org.schedule.schedulemanaging.dto.member.MemberResponse;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final UserRepository userRepository;

    public List<MemberResponse> getAllMembers() {
        return userRepository.findAllByRole(User.Role.MEMBER).stream()
                .map(user -> MemberResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .phone("010-0000-0000") // User 엔티티에 phone 필드가 없으므로 임시 처리
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public MemberResponse createMember(MemberRequest request) {
        User member = User.builder()
                .email(UUID.randomUUID().toString() + "@member.com")
                .password("password")
                .name(request.getName())
                .role(User.Role.MEMBER)
                .build();
        
        userRepository.save(member);

        return MemberResponse.builder()
                .id(member.getId())
                .name(member.getName())
                .phone(request.getPhone())
                .build();
    }
}
