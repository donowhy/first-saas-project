package org.schedule.schedulemanaging.common.exception;

import lombok.Getter;

/**
 * 전역 공통 커스텀 예외.
 */
@Getter
public class BaseException extends RuntimeException {
    private final ErrorCode errorCode;

    public BaseException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
