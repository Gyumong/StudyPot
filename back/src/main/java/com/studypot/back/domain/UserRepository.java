package com.studypot.back.domain;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

  boolean existsByEmail(String email);

  Optional<User> findByEmail(String email);
}
