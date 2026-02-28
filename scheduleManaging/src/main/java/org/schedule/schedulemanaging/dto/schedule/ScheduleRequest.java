package org.schedule.schedulemanaging.dto.schedule;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDateTime;

/**
 * 일정 생성/수정 요청 DTO.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleRequest {

    @NotBlank(message = "제목은 필수입니다.")
    @Size(max = 100, message = "제목은 최대 100자까지 가능합니다.")
    private String title;

    private String content;

    @NotNull(message = "최대 정원은 필수입니다.")
    @Min(value = 1, message = "정원은 최소 1명 이상이어야 합니다.")
    private Integer maxCapacity;

    @NotNull(message = "시작 시간은 필수입니다.")
    @FutureOrPresent(message = "시작 시간은 현재 이후여야 합니다.")
    private LocalDateTime startTime;

    @NotNull(message = "종료 시간은 필수입니다.")
    private LocalDateTime endTime;

    /**
     * 비즈니스 유효성 검증: 시작 시간이 종료 시간보다 빨라야 함.
     */
    public boolean isValidTime() {
        return startTime != null && endTime != null && startTime.isBefore(endTime);
    }
}
