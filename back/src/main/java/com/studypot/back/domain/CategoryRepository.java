package com.studypot.back.domain;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  @Transactional
  void deleteAllByUserId(Long userId);
}