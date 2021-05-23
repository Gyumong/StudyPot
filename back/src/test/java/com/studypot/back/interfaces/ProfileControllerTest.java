package com.studypot.back.interfaces;

import com.studypot.back.applications.UserService;
import com.studypot.back.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ProfileController.class)
@Import({JwtUtil.class})
class ProfileControllerTest {

  @Autowired
  private MockMvc mvc;

  @MockBean
  private UserService userService;

  private String token;

  @BeforeEach
  public void setUp() {
    this.token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImxlbyIsInVzZXJJZCI6MSwiZXhwaXJlZEF0IjoxNjIwOTE2NDIyLCJpYXQiOjE2MjA1NTY0MjJ9.12S7kyTISSP1EIqcrcoTU4X9HHc4SfjAkcaFu9Xz3f0";
  }

}