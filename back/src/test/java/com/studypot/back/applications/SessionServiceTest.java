package com.studypot.back.applications;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.MockitoAnnotations.openMocks;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.session.SessionResponseDto;
import com.studypot.back.exceptions.UnregisteredEmailException;
import com.studypot.back.exceptions.WrongPasswordException;
import com.studypot.back.utils.JwtUtil;
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

  @Mock
  private JwtUtil jwtUtil;

  private Long id;
  private String name;
  private String email;
  private String password;
  private User mockUser;

  @BeforeEach
  public void setUp() {
    openMocks(this);
    this.sessionService = new SessionService(userRepository, passwordEncoder, jwtUtil);

    this.id = 1L;
    this.name = "leo";
    this.email = "test@naver.com";
    this.password = "1234";

    this.mockUser = User.builder()
        .id(id).name(name)
        .email(email)
        .password(passwordEncoder.encode(password))
        .build();

  }

  @Test
  public void authenticateWithValid() {

    given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(mockUser));
    given(passwordEncoder.matches(any(), any())).willReturn(true);
    given(jwtUtil.createAccessToken(id, name)).willReturn("header.access.signature");
    given(jwtUtil.createRefreshToken(id)).willReturn("header.refresh.signature");

    SessionResponseDto sessionResponseDto = sessionService.authenticate(email, password);

    assertThat(sessionResponseDto.getAccessToken(), is("header.access.signature"));
    assertThat(sessionResponseDto.getRefreshToken(), is("header.refresh.signature"));
  }

  @Test
  public void authenticateWithUnregisteredEmail() {
    this.email = "test2@naver.com";

    given(userRepository.findByEmail(email)).willThrow(UnregisteredEmailException.class);

    assertThrows(UnregisteredEmailException.class, () -> sessionService.authenticate(email, password));

  }

  @Test
  public void authenticateWithWrongPassword() {
    this.password = "4321";

    given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(mockUser));
    given(passwordEncoder.matches(password, mockUser.getPassword())).willReturn(false);

    assertThrows(WrongPasswordException.class, () -> sessionService.authenticate(email, password));

  }

  @Test
  public void checkRefreshToken() {
    given(userRepository.findById(id)).willReturn(Optional.ofNullable(mockUser));
    given(jwtUtil.createAccessToken(id, name)).willReturn("header.payload.signature");
    given(jwtUtil.createRefreshToken(id)).willReturn("never produced");
    SessionResponseDto sessionResponseDto = sessionService.checkRefreshToken(id);

    assertThat(sessionResponseDto.getAccessToken(), is("header.payload.signature"));
    assertNull(sessionResponseDto.getRefreshToken());
  }

}