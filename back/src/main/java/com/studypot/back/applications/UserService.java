package com.studypot.back.applications;

import com.studypot.back.domain.Category;
import com.studypot.back.domain.CategoryRepository;
import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.user.UserSignupRequestDto;
import com.studypot.back.exceptions.ExistEmailException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  private final CategoryRepository categoryRepository;


  public User registerUser(UserSignupRequestDto signupRequestDto) {

    String email = checkEmail(signupRequestDto.getEmail());
    String encodedPassword = checkPassword(signupRequestDto.getPassword());

    User savedUser = userRepository.save(
        User.builder()
            .email(email)
            .name(signupRequestDto.getName())
            .password(encodedPassword)
            .build()
    );
    saveCategories(signupRequestDto.getCategories(), savedUser);

    return savedUser;
  }

  private String checkEmail(String email) {
    if (userRepository.existsByEmail(email)) {
      throw new ExistEmailException(email);
    }
    return email;
  }

  private String checkPassword(String password) {
    //TODO: 패스워드 확인 더 만들기
    String encodedPassword = passwordEncoder.encode(password);
    return encodedPassword;
  }

  private void saveCategories(List<String> categories, User user) {
    // TODO: enum 클래스로 리팩토링할 때 수정하기
    Set<Category> categorySet = new HashSet<>();
    for (String c : categories) {

      categorySet.add(
          Category.builder()
              .user(user)
              .category(Category.EnumCategory.valueOf(c))
              .build());
    }

    categoryRepository.saveAll(categorySet);
  }

}
