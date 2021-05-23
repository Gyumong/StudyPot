package com.studypot.back.applications;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.openMocks;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.exceptions.UnregisteredEmailException;
import com.studypot.back.exceptions.WrongPasswordException;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;

class SessionServiceTest {

  private SessionService sessionService;

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @BeforeEach
  public void setUp() {
    openMocks(this);
    this.sessionService = new SessionService(userRepository, passwordEncoder);
  }

  @Test
  public void authenticateWithValid() {
    String email = "test@naver.com";
    String password = "1234";

    User mockUser = User.builder().email(email).build();
    given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(mockUser));
    given(passwordEncoder.matches(any(), any())).willReturn(true);

    User user = sessionService.authenticate(email, password);

    assertEquals(email, user.getEmail());

  }

  @Test
  public void authenticateWithUnregisteredEmail() {
    String email = "test@naver.net";
    String password = "1234";

    given(userRepository.findByEmail(email)).willThrow(UnregisteredEmailException.class);

    assertThrows(UnregisteredEmailException.class, () -> sessionService.authenticate(email, password));

  }

  @Test
  public void authenticateWithWrongPassword() {
    String email = "test@naver.com";
    String password = "4321";

    User mockUser = User.builder().email(email).password(password).build();
    given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(mockUser));
    given(passwordEncoder.matches(any(), any())).willReturn(false);

    assertThrows(WrongPasswordException.class, () -> sessionService.authenticate(email, password));

  }

  @Test
  public void checkRefreshToken() {
    Long userId = 1L;
    User mockUser = User.builder().name("leo").build();
    given(userRepository.findById(1L)).willReturn(Optional.ofNullable(mockUser));
    sessionService.checkRefreshToken(userId);

    verify(userRepository).findById(any(Long.class));
  }

}