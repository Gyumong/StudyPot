package com.studypot.back.interfaces;

import com.studypot.back.applications.StudyService;
import com.studypot.back.auth.UserId;
import com.studypot.back.dto.study.InfinityScrollResponseDto;
import com.studypot.back.dto.study.PageableRequestDto;
import com.studypot.back.dto.study.StudyCreateRequestDto;
import com.studypot.back.dto.study.StudyDetailResponseDto;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StudyController {

  private final StudyService studyService;

  @PostMapping("/study")
  @ResponseStatus(HttpStatus.CREATED)
  public void addStudy(
      @UserId Long userId,
      StudyCreateRequestDto studyCreateRequestDto
  ) throws IOException {
    studyService.addStudy(userId, studyCreateRequestDto);
  }

  @GetMapping("/study/{studyId}")
  public StudyDetailResponseDto studyDetail(@PathVariable("studyId") Long studyId) {
    return studyService.getStudy(studyId);
  }

  @GetMapping("/study")
  public InfinityScrollResponseDto studyList(
      PageableRequestDto pageableRequestDto
  ) {
    return studyService.getStudyList(pageableRequestDto);
  }
}
