package org.schedule.schedulemanaging.service;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.dto.settlement.SettlementResponse;
import org.schedule.schedulemanaging.entity.InstructorSalaryConfig;
import org.schedule.schedulemanaging.entity.Schedule;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.InstructorSalaryConfigRepository;
import org.schedule.schedulemanaging.repository.ScheduleRepository;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PayrollSettlementService {

    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final InstructorSalaryConfigRepository instructorSalaryConfigRepository;

    public List<SettlementResponse> getMonthlySettlements(int year, int month) {
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1);

        return userRepository.findAllByRole(User.Role.INSTRUCTOR).stream()
                .map(instructor -> {
                    InstructorSalaryConfig config = instructorSalaryConfigRepository.findByInstructor(instructor)
                            .orElse(null);
                    
                    // 해당 기간 동안 강사가 진행한 수업 횟수 조회
                    long sessionCount = scheduleRepository.findAll().stream()
                            .filter(s -> s.getInstructor().equals(instructor))
                            .filter(s -> s.getStartTime().isAfter(start) && s.getStartTime().isBefore(end))
                            .count();

                    BigDecimal basicPay = config != null ? config.getBaseSalary() : BigDecimal.ZERO;
                    BigDecimal rate = config != null ? config.getIncentivePerSession() : BigDecimal.ZERO;
                    BigDecimal totalSalary = basicPay.add(rate.multiply(BigDecimal.valueOf(sessionCount)));

                    return SettlementResponse.builder()
                            .instructor_id(instructor.getId())
                            .name(instructor.getName())
                            .basic_pay(basicPay)
                            .per_session_rate(rate)
                            .session_count((int) sessionCount)
                            .total_salary(totalSalary)
                            .build();
                })
                .collect(Collectors.toList());
    }
}
