package com.studypot.back.interfaces;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.studypot.back.applications.SessionService;
import com.studypot.back.domain.User;
import com.studypot.back.utils.JwtUtil;
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

  @MockBean
  private SessionService sessionService;

//  @MockBean
//  private JwtUtil jwtUtil;

  @Test
  public void signIn() throws Exception {
    String email = "test@naver.com";
    String password = "1234";
    User mockUser = User.builder().email(email).password(password).build();

    given(sessionService.authenticate(email, password)).willReturn(mockUser);
//    given(jwtUtil.createAccessToken(1L, "Leo")).willReturn("jwtToken");

    mvc.perform(post("/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\n"
            + "    \"email\":\"test@naver.com\", \"password\":\"1234\"\n"
            + "  }"))
        .andExpect(status().isOk());

    verify(sessionService).authenticate("test@naver.com", "1234");

//    verify(jwtUtil).createAccessToken(any(), any());

  }

  @Test
  public void refreshToken() throws Exception {
    String token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImxlbyIsInVzZXJJZCI6MSwiZXhwaXJlZEF0IjoxNjIxNzg3NDIzLCJpYXQiOjE2MjE3NjU2MjN9.9UQdhuT9M2dS3zbHC7ASOXMISmR_4x8_1n5xtZmRQKw";

    String email = "test@naver.com";
    String password = "1234";
    User mockUser = User.builder().email(email).password(password).build();

    given(sessionService.checkRefreshToken(1L)).willReturn(mockUser);

    mvc.perform(get("/refresh")
        .header("Authorization", "Bearer " + token)
    )
        .andExpect(status().isOk());

    Long userId = 1L;
    verify(sessionService).checkRefreshToken(userId);

  }

//  @Test
//  public void signInWithInvalidDto() throws Exception {
//
//    mvc.perform(post("/login")
//        .contentType(MediaType.APPLICATION_JSON)
//        .content("{\n"
//            + "    \"email\":\"test@naver.com\"\n"
//            + "  }"))
//        .andExpect(status().isOk());
//
//  }

}