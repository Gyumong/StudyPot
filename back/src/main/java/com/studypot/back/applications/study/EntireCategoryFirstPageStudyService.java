package com.studypot.back.applications.study;

import com.studypot.back.domain.Study;
import com.studypot.back.domain.StudyRepository;
import com.studypot.back.dto.study.PageableRequestDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class EntireCategoryFirstPageStudyService implements GetStudyService {

  private final StudyRepository studyRepository;

  @Override
  public List<Study> getStudyList(PageableRequestDto request, Pageable pageable) {
    return studyRepository
        .findAll(pageable)
        .stream()
        .collect(Collectors.toList())
        ;
  }
}
