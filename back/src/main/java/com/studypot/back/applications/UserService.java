package com.studypot.back.applications;

import com.studypot.back.domain.Category;
import com.studypot.back.domain.CategoryRepository;
import com.studypot.back.domain.User;
import com.studypot.back.domain.UserCategory;
import com.studypot.back.domain.UserCategoryRepository;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.user.UserSignupRequestDto;
import com.studypot.back.exceptions.ExistEmailException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  private final UserCategoryRepository userCategoryRepository;

  private final CategoryRepository categoryRepository;


  public User registerUser(UserSignupRequestDto resource) {

    String email = checkEmail(resource.getEmail());
    String encodedPassword = checkPassword(resource.getPassword());

    User savedUser = userRepository.save(
        User.builder()
            .email(email)
            .name(resource.getName())
            .password(encodedPassword)
            .build()
    );
    saveCategories(resource.getCategories(), savedUser);
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

  private void saveCategories(List<String> categories, User savedUser) {
    for (String c : categories) {
      Category category = categoryRepository.findByName(c).orElse(
          categoryRepository.save(Category.builder().name(c).build())
      );
      userCategoryRepository.save(UserCategory.builder().user(savedUser).Category(category).build());
    }
  }

}
