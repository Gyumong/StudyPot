package com.studypot.back.applications;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.openMocks;

import com.studypot.back.domain.CategoryName;
import com.studypot.back.domain.UserCategoryRepository;
import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.user.UserSignupRequestDto;
import java.util.ArrayList;
import java.util.List;
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

  @Mock
  private UserCategoryRepository userCategoryRepository;

  @BeforeEach
  public void setUp() {
    openMocks(this);
    userService = new UserService(userRepository, passwordEncoder, userCategoryRepository);
  }

  @Test
  public void registerUser() {

    String name = "test";
    String email = "test@naver.com";
    String password = "test";
    User mockUser = User.builder().email(email).name(name).password(passwordEncoder.encode(password)).build();

    List<CategoryName> categories = new ArrayList<>();
    categories.add(CategoryName.valueOf("COMPUTER_IT"));
    UserSignupRequestDto mockDto = new UserSignupRequestDto();
    mockDto.setCategories(categories);

    given(userRepository.save(any(User.class))).willReturn(mockUser);

    User user = userService.registerUser(mockDto);

    assertThat(user.getName(), is("test"));

    verify(userRepository).save(any());

  }

}