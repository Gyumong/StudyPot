package com.studypot.back.applications;

import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.session.SessionResponseDto;
import com.studypot.back.exceptions.UnregisteredEmailException;
import com.studypot.back.exceptions.UserNotFoundException;
import com.studypot.back.exceptions.WrongPasswordException;
import com.studypot.back.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;


  public SessionResponseDto authenticate(String email, String password) {

    User user = userRepository.findByEmail(email).orElseThrow(() -> new UnregisteredEmailException(email));

    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new WrongPasswordException();
    }

    return makeToken(user.getId(), user.getName(), false);

  }

  public SessionResponseDto checkRefreshToken(Long userId) {
    User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    return makeToken(user.getId(), user.getName(), true);
  }

  private SessionResponseDto makeToken(Long userId, String userName, Boolean isRefreshToken) {
    SessionResponseDto responseDto = new SessionResponseDto();

    String accessToken = jwtUtil.createAccessToken(userId, userName);
    responseDto.setAccessToken(accessToken);

    if (!isRefreshToken) {
      String refreshToken = jwtUtil.createRefreshToken(userId);
      responseDto.setRefreshToken(refreshToken);
    }

    return responseDto;
  }

}