package org.schedule.schedulemanaging.dto.settlement;

import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;

@Getter
@Builder
public class SettlementResponse {
    private Long instructor_id;
    private String name;
    private BigDecimal basic_pay;
    private BigDecimal per_session_rate;
    private Integer session_count;
    private BigDecimal total_salary;
}
