package com.studypot.back.applications.study;

import com.studypot.back.domain.Study;
import com.studypot.back.domain.StudyCategory;
import com.studypot.back.domain.StudyCategoryRepository;
import com.studypot.back.dto.study.PageableRequestDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class SelectedCategoryFirstPageStudyService implements GetStudyService {

  private final StudyCategoryRepository studyCategoryRepository;

  @Override
  public List<Study> getStudyList(PageableRequestDto request, Pageable pageable) {
    List<StudyCategory> studyCategoryList = studyCategoryRepository
        .findAllByCategory(pageable, request.getCategoryName());

    return studyCategoryList.stream().map(StudyCategory::getStudy).collect(Collectors.toList());
  }
}
