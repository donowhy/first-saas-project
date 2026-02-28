package org.schedule.schedulemanaging.service;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.exception.BaseException;
import org.schedule.schedulemanaging.common.exception.ErrorCode;
import org.schedule.schedulemanaging.dto.auth.LoginRequest;
import org.schedule.schedulemanaging.dto.auth.SignUpRequest;
import org.schedule.schedulemanaging.dto.auth.TokenResponse;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.schedule.schedulemanaging.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * SaaS 회원가입 및 인증(로그인) 비즈니스 로직 처리.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final org.schedule.schedulemanaging.service.notification.NotificationService emailNotificationService;

    @Transactional
    public void signUp(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BaseException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(User.Role.USER)
                .build();

        userRepository.save(user);

        // 회원가입 환영 메일 발송
        emailNotificationService.send(
            user.getEmail(),
            "[Nexus] Welcome to our workspace!",
            "Hi " + user.getName() + ",\n\nWelcome to Nexus! Your account has been successfully created."
        );
    }

    public TokenResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BaseException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BaseException(ErrorCode.INVALID_CREDENTIALS);
        }

        String token = jwtTokenProvider.createToken(user.getEmail(), user.getRole().name());

        return TokenResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .build();
    }
}
