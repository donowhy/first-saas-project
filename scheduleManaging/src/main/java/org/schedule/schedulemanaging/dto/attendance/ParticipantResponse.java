package org.schedule.schedulemanaging.dto.attendance;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.schedule.schedulemanaging.entity.Enrollment;

@Getter
@Builder
@AllArgsConstructor
public class ParticipantResponse {
    private Long enrollmentId;
    private String memberName;
    private String memberEmail;
    private Enrollment.AttendanceStatus status;

    public static ParticipantResponse from(Enrollment enrollment) {
        return ParticipantResponse.builder()
                .enrollmentId(enrollment.getId())
                .memberName(enrollment.getMember().getName())
                .memberEmail(enrollment.getMember().getEmail())
                .status(enrollment.getAttendanceStatus())
                .build();
    }
}
