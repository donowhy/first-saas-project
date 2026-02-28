package org.schedule.schedulemanaging.repository;

import org.schedule.schedulemanaging.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * SaaS 사용자 데이터 접근을 위한 JPA 리포지토리.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
