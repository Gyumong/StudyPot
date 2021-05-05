package com.studypot.back.applications;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.openMocks;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.user.UpdateProfileRequestDto;
import com.studypot.back.exceptions.UnregisteredEmailException;
import com.studypot.back.exceptions.WrongPasswordException;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;

class UserServiceTest {

  private UserService userService;

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @BeforeEach
  public void setUp() {
    openMocks(this);
    userService = new UserService(userRepository, passwordEncoder);
  }

  @Test
  public void registerUser() {

    String name = "test";
    String email = "test@naver.com";
    String password = "test";

    User mockUser = User.builder().email(email).name(name).password(passwordEncoder.encode(password)).build();

    given(userRepository.save(any(User.class))).willReturn(mockUser);

    User user = userService.registerUser(name, email, password);

    assertEquals("test", user.getName());

    verify(userRepository).save(any());

  }

  @Test
  public void authenticateWithValid() {
    String email = "test@naver.com";
    String password = "1234";

    User mockUser = User.builder().email(email).build();
    given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(mockUser));
    given(passwordEncoder.matches(any(), any())).willReturn(true);

    User user = userService.authenticate(email, password);

    assertEquals(email, user.getEmail());

  }

  @Test
  public void authenticateWithUnregisteredEmail() {
    String email = "test@naver.net";
    String password = "1234";

    given(userRepository.findByEmail(email)).willThrow(UnregisteredEmailException.class);

    assertThrows(UnregisteredEmailException.class, () -> userService.authenticate(email, password));

  }

  @Test
  public void authenticateWithWrongPassword() {
    String email = "test@naver.com";
    String password = "4321";

    User mockUser = User.builder().email(email).password(password).build();
    given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(mockUser));
    given(passwordEncoder.matches(any(), any())).willReturn(false);

    assertThrows(WrongPasswordException.class, () -> userService.authenticate(email, password));

  }

  @Test
  public void getProfile() {

    userService.getProfile("leo");

    verify(userRepository).findByName("leo");

  }

  @Test
  public void updateProfile() {

    User mockUser = User.builder().location("Seoul").build();
    UpdateProfileRequestDto updateProfileRequestDto = new UpdateProfileRequestDto();
    Long userId = 1L;

    given(userRepository.findById(userId)).willReturn(Optional.ofNullable(mockUser));

    userService.updateProfile(userId, updateProfileRequestDto);

    verify(userRepository).findById(any(Long.class));
    verify(userRepository).save(any(User.class));
  }

}