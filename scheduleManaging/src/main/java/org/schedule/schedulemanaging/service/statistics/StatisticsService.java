package org.schedule.schedulemanaging.service.statistics;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.repository.MembershipPurchaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final MembershipPurchaseRepository purchaseRepository;

    public Map<String, Object> getMonthlyRevenue(Long orgId, int year, int month) {
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1).minusNanos(1);

        Long totalRevenue = purchaseRepository.sumAmountByOrganizationAndDate(orgId, start, end);

        return Map.of(
            "organizationId", orgId,
            "period", year + "-" + month,
            "totalRevenue", totalRevenue != null ? totalRevenue : 0L
        );
    }
}
