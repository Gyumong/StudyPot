package com.studypot.back.interfaces;

import com.studypot.back.applications.UserService;
import com.studypot.back.domain.User;
import com.studypot.back.dto.session.SessionRequestDto;
import com.studypot.back.dto.session.SessionResponseDto;
import com.studypot.back.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionController {

  private final JwtUtil jwtUtil;

  private final UserService userService;

  public SessionController(UserService userService, JwtUtil jwtUtil) {

    this.userService = userService;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/login")
  public SessionResponseDto signIn(@RequestBody SessionRequestDto resource) {

    String email = resource.getEmail();
    String password = resource.getPassword();

    User user = userService.authenticate(email, password);

    String accessToken = jwtUtil.createAccessToken(user.getId(), user.getName());
    String refreshToken = jwtUtil.createRefreshToken(user.getId());

    SessionResponseDto responseDto = new SessionResponseDto();

    responseDto.setAccessToken(accessToken);
    responseDto.setRefreshToken(refreshToken);
    return responseDto;
  }

  @GetMapping("/refresh")
  public SessionResponseDto refreshToken(Authentication authentication) {
    Claims claims = (Claims) authentication.getPrincipal();
    Long userId = claims.get("userId", Long.class);

    User user = userService.checkRefreshToken(userId);

    String userName = user.getName();
    String accessToken = jwtUtil.createAccessToken(userId, userName);

    SessionResponseDto responseDto = new SessionResponseDto();

    responseDto.setAccessToken(accessToken);

    return responseDto;
  }

}
