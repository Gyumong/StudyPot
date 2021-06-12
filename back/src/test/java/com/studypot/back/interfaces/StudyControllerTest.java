package com.studypot.back.interfaces;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.studypot.back.applications.StudyService;
import com.studypot.back.dto.study.StudyCreateRequestDto;
import com.studypot.back.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(StudyController.class)
@Import({JwtUtil.class})
class StudyControllerTest {

  @Autowired
  private MockMvc mvc;

  @Autowired
  private JwtUtil jwtUtil;

  private String token;

  @MockBean
  private StudyService studyService;

  @BeforeEach
  public void setUp() {
    this.token = jwtUtil.createAccessToken(1L, "leo");
  }

  @Test
  public void addStudy() throws Exception {

    mvc.perform(post("/study")
        .header("Authorization", "Bearer " + token)
        .contentType(MediaType.MULTIPART_FORM_DATA)
        .content("[\"title\", \"FIRST\"]"))
        .andExpect(status().isCreated());

    verify(studyService).addStudy(any(Long.class), any(StudyCreateRequestDto.class));
  }

}