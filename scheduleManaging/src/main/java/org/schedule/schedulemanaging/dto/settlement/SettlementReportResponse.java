package org.schedule.schedulemanaging.dto.settlement;

import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;

@Getter
@Builder
public class SettlementReportResponse {
    private String instructorName;
    private String month;
    private BigDecimal baseSalary;
    private long sessionCount;
    private BigDecimal incentivePerSession;
    private BigDecimal totalIncentive;
    private BigDecimal finalAmount;
}
