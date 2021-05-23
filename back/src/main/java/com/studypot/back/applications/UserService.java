package com.studypot.back.applications;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.exceptions.ExistEmailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User registerUser(String name, String email, String password) {

    if (userRepository.existsByEmail(email)) {
      throw new ExistEmailException(email);
    }

    String encodedPassword = passwordEncoder.encode(password);

    User user = User.builder()
        .name(name)
        .email(email)
        .password(encodedPassword)
        .build();

    return userRepository.save(user);
  }

}
