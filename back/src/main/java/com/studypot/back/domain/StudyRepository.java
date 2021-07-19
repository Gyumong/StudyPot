package com.studypot.back.domain;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Long> {

  List<Study> findAllByIdLessThan(Pageable pageable, Long lastId);

  Optional<Study> getFirstBy();
}
