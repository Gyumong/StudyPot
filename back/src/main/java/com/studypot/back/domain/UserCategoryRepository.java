package com.studypot.back.domain;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {

  //TODO: Transactional 분석
  @Transactional
  void deleteAllByUserId(Long userId);
}