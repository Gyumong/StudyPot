package com.studypot.back.interfaces;

import com.studypot.back.applications.SessionService;
import com.studypot.back.auth.UserId;
import com.studypot.back.domain.User;
import com.studypot.back.dto.session.SessionRequestDto;
import com.studypot.back.dto.session.SessionResponseDto;
import com.studypot.back.utils.JwtUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api("세션")
@RequiredArgsConstructor
public class SessionController {

  private final JwtUtil jwtUtil;

  private final SessionService sessionService;

  @PostMapping("/login")
  @ApiOperation("로그인")
  public SessionResponseDto signIn(@RequestBody SessionRequestDto resource) {

    String email = resource.getEmail();
    String password = resource.getPassword();

    User user = sessionService.authenticate(email, password);

    String accessToken = jwtUtil.createAccessToken(user.getId(), user.getName());
    String refreshToken = jwtUtil.createRefreshToken(user.getId());

    SessionResponseDto responseDto = new SessionResponseDto();

    responseDto.setAccessToken(accessToken);
    responseDto.setRefreshToken(refreshToken);
    return responseDto;
  }

  @GetMapping("/refresh")
  @ApiOperation("토큰 리프레시")
  public SessionResponseDto refreshToken(@UserId Long userId) {

    User user = sessionService.checkRefreshToken(userId);

    String userName = user.getName();
    String accessToken = jwtUtil.createAccessToken(userId, userName);

    SessionResponseDto responseDto = new SessionResponseDto();

    responseDto.setAccessToken(accessToken);

    return responseDto;
  }

}
