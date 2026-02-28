package org.schedule.schedulemanaging.service.settlement;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.exception.BaseException;
import org.schedule.schedulemanaging.common.exception.ErrorCode;
import org.schedule.schedulemanaging.entity.*;
import org.schedule.schedulemanaging.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InstructorSettlementService {

    private final InstructorSalaryConfigRepository salaryConfigRepository;
    private final InstructorSettlementRepository settlementRepository;
    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void processSettlement(User instructor, int year, int month) {
        String monthStr = String.format("%d-%02d", year, month);

        InstructorSalaryConfig config = salaryConfigRepository.findByInstructor(instructor)
                .orElseThrow(() -> new BaseException(ErrorCode.INTERNAL_SERVER_ERROR));

        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1).minusNanos(1);
        
        long sessionCount = scheduleRepository.countByInstructorAndStartTimeBetween(instructor, start, end);

        BigDecimal totalIncentive = config.getIncentivePerSession().multiply(BigDecimal.valueOf(sessionCount));
        BigDecimal finalAmount = config.getBaseSalary().add(totalIncentive);

        InstructorSettlement settlement = InstructorSettlement.builder()
                .instructor(instructor)
                .settlementMonth(monthStr)
                .totalBaseSalary(config.getBaseSalary())
                .totalSessionCount(sessionCount)
                .totalIncentive(totalIncentive)
                .finalAmount(finalAmount)
                .settledAt(LocalDateTime.now())
                .build();

        settlementRepository.save(settlement);
    }
}
