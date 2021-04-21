package com.studypot.back.applications;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
      throw new RuntimeException("duplicated email.");
    }

    String encodedPassword = passwordEncoder.encode(password);

    User user = User.builder()
        .name(name)
        .email(email)
        .password(encodedPassword)
        .build();
    User thisUser = userRepository.save(user);

    System.out.println(thisUser.getPassword());

    return thisUser;
  }
}
