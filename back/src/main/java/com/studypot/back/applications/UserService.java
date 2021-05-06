package com.studypot.back.applications;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.user.ProfileProjection;
import com.studypot.back.dto.user.ProfileResponseDto;
import com.studypot.back.dto.user.UpdateProfileRequestDto;
import com.studypot.back.exceptions.ExistEmailException;
import com.studypot.back.exceptions.UnregisteredEmailException;
import com.studypot.back.exceptions.WrongPasswordException;
import java.util.Optional;
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

  public User authenticate(String email, String password) {

    User user = userRepository.findByEmail(email).orElseThrow(() -> new UnregisteredEmailException(email));

    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new WrongPasswordException();
    }

    return user;
  }

  public ProfileProjection getProfile(String name) {

    //todo: 인덱스와 유니크
    return userRepository.findByName(name);

  }

  public ProfileResponseDto updateProfile(Long userId, UpdateProfileRequestDto updateProfileRequestDto) {
    User updateUser = userRepository.findById(userId).orElseThrow(() -> new UnregisteredEmailException("User Not Found"));
    ProfileResponseDto profileResponseDto = updateUser.updateProfile(updateProfileRequestDto);
    userRepository.save(updateUser);

    return profileResponseDto;
  }

  public User checkRefreshToken(Long userId) {
    Optional<User> user = userRepository.findById(userId);
    return user.orElseThrow(() -> new UnregisteredEmailException("User Not Found"));
  }
}
