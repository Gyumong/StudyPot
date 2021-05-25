package com.studypot.back.interfaces;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.studypot.back.applications.SessionService;
import com.studypot.back.dto.session.SessionResponseDto;
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
@WebMvcTest(SessionController.class)
@Import(JwtUtil.class)
class SessionControllerTest {

  @Autowired
  private MockMvc mvc;

  @Autowired
  private JwtUtil jwtUtil;

  @MockBean
  private SessionService sessionService;

  private String token;

  @BeforeEach
  public void setUp() {
    token = jwtUtil.createRefreshToken(1L);
  }

  @Test
  public void signIn() throws Exception {
    String email = "test@naver.com";
    String password = "1234";

    given(sessionService.authenticate(email, password)).willReturn(new SessionResponseDto());

    mvc.perform(post("/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\n"
            + "    \"email\":\"test@naver.com\", \"password\":\"1234\"\n"
            + "  }"))
        .andExpect(status().isOk());

    verify(sessionService).authenticate("test@naver.com", "1234");

  }

  @Test
  public void refreshToken() throws Exception {

    Long userId = 1L;
    given(sessionService.checkRefreshToken(userId)).willReturn(new SessionResponseDto());

    mvc.perform(get("/refresh")
        .header("Authorization", "Bearer " + token)
    )
        .andExpect(status().isOk());

    verify(sessionService).checkRefreshToken(userId);

  }

}