package com.studypot.back.interfaces;

import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.openMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.studypot.back.applications.ProfileService;
import com.studypot.back.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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
  private ProfileService profileService;

  private String token;

  @Autowired
  private JwtUtil jwtUtil;

  @BeforeEach
  public void setUp() {
    openMocks(this);
    this.token = jwtUtil.createAccessToken(1L, "leo");

  }

  @Test
  public void getProfile() throws Exception {
    mvc.perform(get("/user")
        .header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());
    verify(profileService).getProfile(1L);
  }

}