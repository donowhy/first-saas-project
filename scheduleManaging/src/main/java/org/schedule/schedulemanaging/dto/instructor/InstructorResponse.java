package org.schedule.schedulemanaging.dto.instructor;

import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;

@Getter
@Builder
public class InstructorResponse {
    private Long id;
    private String name;
    private String phone;
    private String color;
    private BigDecimal basic_pay;
    private BigDecimal rate;
}
