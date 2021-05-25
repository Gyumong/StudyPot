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

    SessionResponseDto sessionResponseDto = new SessionResponseDto();

    accessTokenResponse(sessionResponseDto, user.getId(), user.getName());
    refreshTokenResponse(sessionResponseDto, user.getId());

    return sessionResponseDto;

  }

  public SessionResponseDto createAccessToken(Long userId) {

    User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

    SessionResponseDto responseDto = new SessionResponseDto();

    accessTokenResponse(responseDto, user.getId(), user.getName());

    return responseDto;
  }

  private void accessTokenResponse(SessionResponseDto sessionResponseDto, Long userId, String userName) {
    sessionResponseDto.setAccessToken(jwtUtil.createAccessToken(userId, userName));
  }

  private void refreshTokenResponse(SessionResponseDto sessionResponseDto, Long userId) {
    sessionResponseDto.setRefreshToken(jwtUtil.createRefreshToken(userId));
  }

}