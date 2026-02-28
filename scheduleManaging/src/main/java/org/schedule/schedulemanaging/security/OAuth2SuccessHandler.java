package org.schedule.schedulemanaging.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.entity.User;
import org.schedule.schedulemanaging.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        
        String email = null;
        String name = null;

        // 구글 로그인 처리
        if (attributes.containsKey("email")) {
            email = (String) attributes.get("email");
            name = (String) attributes.get("name");
        } 
        // 카카오 로그인 처리
        else if (attributes.containsKey("kakao_account")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            email = (String) kakaoAccount.get("email");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
            name = (String) profile.get("nickname");
        }

        // 사용자가 없으면 자동 가입 (기존 로직 연동)
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(attributes.get("email").toString())
                    .name(name)
                    .role(User.Role.USER) // 기본 역할
                    .build();
            return userRepository.save(newUser);
        });

        // JWT 생성
        String token = tokenProvider.createToken(user.getEmail(), user.getRole().name());

        // 프론트엔드 리다이렉트 (JWT와 함께)
        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/oauth/callback")
                .queryParam("token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
