package org.schedule.schedulemanaging.dto.instructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class InstructorRequest {
    private String name;
    private String phone;
    private String color;
    private BigDecimal basic_pay;
    private BigDecimal rate;
}
