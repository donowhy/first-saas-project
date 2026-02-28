package org.schedule.schedulemanaging.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * 커스텀 에러 코드 정의.
 */
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // Auth
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "AUTH_001", "이메일 또는 비밀번호가 올바르지 않습니다."),
    USER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "AUTH_002", "이미 가입된 이메일입니다."),
    
    // Schedule
    SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "SCH_001", "해당 일정이 존재하지 않거나 권한이 없습니다."),
    INVALID_TIME_RANGE(HttpStatus.BAD_REQUEST, "SCH_002", "종료 시간이 시작 시간보다 빨라야 합니다."),
    SCHEDULE_FULL(HttpStatus.BAD_REQUEST, "SCH_003", "정원이 초과되어 예약할 수 없습니다."),
    ALREADY_ENROLLED(HttpStatus.BAD_REQUEST, "SCH_004", "이미 예약된 일정입니다."),

    // Organization
    ORGANIZATION_NOT_FOUND(HttpStatus.NOT_FOUND, "ORG_001", "조직 정보를 찾을 수 없습니다."),
    ACCESS_DENIED_ORG(HttpStatus.FORBIDDEN, "AUTH_003", "해당 조직의 데이터에 접근 권한이 없습니다."),
    NOT_INSTRUCTOR(HttpStatus.FORBIDDEN, "AUTH_004", "강사 권한이 필요합니다."),

    // Enrollment / Membership
    ENROLLMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "ENR_001", "예약 내역을 찾을 수 없습니다."),
    MEMBERSHIP_NOT_FOUND(HttpStatus.NOT_FOUND, "MEM_001", "유효한 회원권을 찾을 수 없습니다."),
    INSUFFICIENT_PASSES(HttpStatus.BAD_REQUEST, "MEM_002", "잔여 횟수가 부족합니다."),
    MEMBERSHIP_EXPIRED(HttpStatus.BAD_REQUEST, "MEM_003", "만료된 회원권입니다."),

    // Notification
    NOTIFICATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "NOTI_001", "알림 발송에 실패했습니다."),
    
    // Global
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "G001", "서버 내부 오류가 발생했습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
