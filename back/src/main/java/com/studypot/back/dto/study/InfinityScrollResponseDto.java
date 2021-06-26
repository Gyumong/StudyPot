package com.studypot.back.dto.study;

import com.studypot.back.domain.Study;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Data;

@Data
public class InfinityScrollResponseDto implements InfinityPage<StudyListEachResponseDto> {

  Long lastIdOfStudyList;

  List<StudyListEachResponseDto> contents;

  public InfinityScrollResponseDto(List<Study> studyList, Study lastStudy) {
    this.lastIdOfStudyList = lastStudy.getId();
    this.contents = toStudyListDto(studyList);
  }

  private List<StudyListEachResponseDto> toStudyListDto(List<Study> studyList) {

    return studyList.stream().map(StudyListEachResponseDto::new).collect(Collectors.toList());
  }

  @Override
  public boolean isLast() {
    
    return lastIdOfStudyList.equals(contents.get(contents.size() - 1).getId());
  }
}