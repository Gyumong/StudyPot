package com.studypot.back.interfaces;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.studypot.back.applications.UserService;
import com.studypot.back.domain.User;
import com.studypot.back.utils.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(SessionController.class)
class SessionControllerTest {

  @Autowired
  private MockMvc mvc;

  @MockBean
  private UserService userService;

  @MockBean
  private JwtUtil jwtUtil;

  @Test
  public void signIn() throws Exception {
    String email = "test@naver.com";
    String password = "1234";
    User mockUser = User.builder().email(email).password(password).build();

    given(userService.authenticate(email, password)).willReturn(mockUser);
    given(jwtUtil.createToken(1L, "Leo")).willReturn("jwtToken");

    mvc.perform(post("/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\n"
            + "    \"email\":\"test@naver.com\", \"password\":\"1234\"\n"
            + "  }"))
        .andExpect(status().isOk());

    verify(userService).authenticate("test@naver.com", "1234");

    verify(jwtUtil).createToken(any(), any());

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