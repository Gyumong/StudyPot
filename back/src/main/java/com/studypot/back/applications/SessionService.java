package com.studypot.back.applications;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.exceptions.UnregisteredEmailException;
import com.studypot.back.exceptions.WrongPasswordException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;


  public User authenticate(String email, String password) {

    User user = userRepository.findByEmail(email).orElseThrow(() -> new UnregisteredEmailException(email));

    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new WrongPasswordException();
    }

    return user;
  }

  public User checkRefreshToken(Long userId) {
    Optional<User> user = userRepository.findById(userId);
    return user.orElseThrow(() -> new UnregisteredEmailException("User Not Found"));
  }

}
