package com.studypot.back.interfaces;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.studypot.back.applications.UserService;
import com.studypot.back.dto.user.UpdateProfileRequestDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ProfileController.class)
class ProfileControllerTest {

  @Autowired
  private MockMvc mvc;

  @MockBean
  private UserService userService;

  private String token;

  @BeforeEach
  public void setUp() {
    this.token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoibGVvIiwiaWF0IjoxNjIwMDIwODEzLCJleHAiOjE2MjAwNTY4MTN9.hw_gKw9UGCkrKxp2BcfDCM-FF7oIXHy4TeaQqemiYgw";
  }

  @Test
  public void getUser() throws Exception {

    mvc.perform(get("/userInfo").header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());

    verify(userService).getProfile("leo");

  }

  @Test
  public void updateUser() throws Exception {
    mvc.perform(patch("/userInfo").header("Authorization", "Bearer " + token)
    .contentType(MediaType.APPLICATION_JSON)
    .content("{\"location\": \"Seoul\"}"))
        .andExpect(status().isOk());

    verify(userService).updateProfile(any(Long.class),any(UpdateProfileRequestDto.class));
  }

}