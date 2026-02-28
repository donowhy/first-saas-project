package org.schedule.schedulemanaging.service;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.dto.instructor.InstructorRequest;
import org.schedule.schedulemanaging.dto.instructor.InstructorResponse;
import org.schedule.schedulemanaging.entity.InstructorSalaryConfig;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.InstructorSalaryConfigRepository;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InstructorService {

    private final UserRepository userRepository;
    private final InstructorSalaryConfigRepository instructorSalaryConfigRepository;

    public List<InstructorResponse> getAllInstructors() {
        return userRepository.findAllByRole(User.Role.INSTRUCTOR).stream()
                .map(user -> {
                    InstructorSalaryConfig config = instructorSalaryConfigRepository.findByInstructor(user)
                            .orElse(null);
                    return InstructorResponse.builder()
                            .id(user.getId())
                            .name(user.getName())
                            .phone("010-0000-0000") // User 엔티티에 phone 필드가 없으므로 임시 처리
                            .color("#6366f1")
                            .basic_pay(config != null ? config.getBaseSalary() : java.math.BigDecimal.ZERO)
                            .rate(config != null ? config.getIncentivePerSession() : java.math.BigDecimal.ZERO)
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public InstructorResponse createInstructor(InstructorRequest request) {
        // 실제 운영 시에는 Email 중복 체크 및 실제 계정 생성 로직 필요
        User instructor = User.builder()
                .email(UUID.randomUUID().toString() + "@instructor.com")
                .password("password")
                .name(request.getName())
                .role(User.Role.INSTRUCTOR)
                .build();
        
        userRepository.save(instructor);

        InstructorSalaryConfig config = InstructorSalaryConfig.builder()
                .instructor(instructor)
                .baseSalary(request.getBasic_pay())
                .incentivePerSession(request.getRate())
                .build();
        
        instructorSalaryConfigRepository.save(config);

        return InstructorResponse.builder()
                .id(instructor.getId())
                .name(instructor.getName())
                .phone(request.getPhone())
                .color(request.getColor())
                .basic_pay(config.getBaseSalary())
                .rate(config.getIncentivePerSession())
                .build();
    }
}
