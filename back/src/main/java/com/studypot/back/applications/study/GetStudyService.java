package com.studypot.back.applications.study;

import com.studypot.back.domain.Study;
import com.studypot.back.dto.study.PageableRequestDto;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public interface GetStudyService {

  List<Study> getStudyList(PageableRequestDto request, Pageable pageable);
}
