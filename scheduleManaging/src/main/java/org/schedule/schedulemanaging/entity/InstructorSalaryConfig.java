package org.schedule.schedulemanaging.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class InstructorSalaryConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", unique = true)
    private User instructor;

    @Column(precision = 19, scale = 2)
    private BigDecimal baseSalary;

    @Column(precision = 19, scale = 2)
    private BigDecimal incentivePerSession;

    public void updateConfig(BigDecimal baseSalary, BigDecimal incentivePerSession) {
        this.baseSalary = baseSalary;
        this.incentivePerSession = incentivePerSession;
    }
}
