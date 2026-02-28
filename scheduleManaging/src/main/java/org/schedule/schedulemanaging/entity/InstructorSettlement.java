package org.schedule.schedulemanaging.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "uk_instructor_month", columnNames = {"instructor_id", "settlementMonth"})
})
public class InstructorSettlement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private User instructor;

    private String settlementMonth;

    @Column(precision = 19, scale = 2)
    private BigDecimal totalBaseSalary;
    
    private long totalSessionCount;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal totalIncentive;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal finalAmount;

    private LocalDateTime settledAt;
}
