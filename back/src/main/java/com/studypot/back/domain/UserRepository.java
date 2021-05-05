package com.studypot.back.domain;

import com.studypot.back.dto.user.ProfileProjection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  boolean existsByEmail(String email);

  Optional<User> findByEmail(String email);

  ProfileProjection findByName(String name);
}
