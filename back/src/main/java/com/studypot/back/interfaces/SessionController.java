package com.studypot.back.interfaces;

import com.studypot.back.Dto.SessionRequestDto;
import com.studypot.back.Dto.SessionResponseDto;
import com.studypot.back.applications.UserService;
import com.studypot.back.domain.User;
import com.studypot.back.utils.JwtUtil;
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

    String token = jwtUtil.createToken(user.getId(), user.getName());

    SessionResponseDto responseDto = new SessionResponseDto();

    responseDto.setAccessToken(token);

    return responseDto;
  }

}
