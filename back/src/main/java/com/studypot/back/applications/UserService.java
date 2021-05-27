package com.studypot.back.applications;

import com.studypot.back.domain.UserCategory;
import com.studypot.back.domain.CategoryName;
import com.studypot.back.domain.UserCategoryRepository;
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

  private final UserCategoryRepository userCategoryRepository;


  public User registerUser(UserSignupRequestDto signupRequestDto) {

    checkEmailExists(signupRequestDto.getEmail());
    String encodedPassword = encodePassword(signupRequestDto.getPassword());

    User savedUser = userRepository.save(
        User.builder()
            .email(signupRequestDto.getEmail())
            .name(signupRequestDto.getName())
            .password(encodedPassword)
            .build()
    );
    saveCategories(signupRequestDto.getCategories(), savedUser);

    return savedUser;
  }

  private void checkEmailExists(String email) {
    if (userRepository.existsByEmail(email)) {
      throw new ExistEmailException(email);
    }
  }

  private String encodePassword(String password) {
    String encodedPassword = passwordEncoder.encode(password);
    return encodedPassword;
  }

  private void saveCategories(List<CategoryName> categories, User user) {
    Set<UserCategory> userCategorySet = new HashSet<>();
    for (CategoryName categoryName : categories) {

      userCategorySet.add(
          UserCategory.builder()
              .user(user)
              .category(categoryName)
              .build());
    }

    userCategoryRepository.saveAll(userCategorySet);
  }

}