package com.studypot.back.interfaces;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.studypot.back.applications.UserService;
import com.studypot.back.dto.user.UserSignupRequestDto;
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
@WebMvcTest(UserController.class)
@Import({JwtUtil.class})
class UserControllerTest {

  @Autowired
  private MockMvc mvc;

  @MockBean
  private UserService userService;

  @Test
  public void create() throws Exception {

    mvc.perform(post("/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\n"
            + "    \"email\":\"test@naver.com\", \"name\":\"tester\", \"password\":\"1234\"\n"
            + "  }"))
        .andExpect(status().isCreated());

    verify(userService).registerUser(any(UserSignupRequestDto.class));
  }

}