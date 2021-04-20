package com.studypot.back.applications;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.openMocks;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class UserServiceTest {

  private UserService userService;

  @Mock
  private UserRepository userRepository;

  @BeforeEach
  public void setUp() {
    openMocks(this);
    userService = new UserService(userRepository);
  }

  @Test
  public void registerUser() {

    String name = "test";
    String email = "test@naver.com";
    String password = "test";

    User mockUser = User.builder().email(email).name(name).password(password).build();

    given(userRepository.save(any(User.class))).willReturn(mockUser);

    User user = userService.registerUser(name, email, password);

    assertEquals(user.getName(), "test");

    verify(userRepository).save(any());

  }

}