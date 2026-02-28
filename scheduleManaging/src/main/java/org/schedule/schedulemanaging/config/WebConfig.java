package org.schedule.schedulemanaging.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web(React, Vue 등) 및 React Native 클라이언트를 위한 공통 설정.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // SaaS 환경: 모든 클라이언트의 API 접근을 위한 CORS 설정
        registry.addMapping("/**")
                .allowedOriginPatterns("*") // 주의: 운영 환경에서는 실제 프론트엔드 도메인(예: "https://app.myschedule.com")으로 제한하여 보안 강화
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // 1시간 동안 Preflight 캐싱 (네트워크 오버헤드 감소 및 성능 향상)
    }
}
