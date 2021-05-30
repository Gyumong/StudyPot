package com.studypot.back.interfaces;

import com.studypot.back.applications.SessionService;
import com.studypot.back.auth.UserId;
import com.studypot.back.dto.session.SessionRequestDto;
import com.studypot.back.dto.session.SessionResponseDto;
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

  private final SessionService sessionService;

  @PostMapping("/login")
  @ApiOperation("로그인")
  public SessionResponseDto signIn(@RequestBody SessionRequestDto resource) {

    String email = resource.getEmail();
    String password = resource.getPassword();

    return sessionService.authenticate(email, password);

  }

  @GetMapping("/refresh")
  @ApiOperation("토큰 리프레시")
  public SessionResponseDto refreshToken(@UserId Long userId) {

    return sessionService.createAccessToken(userId);

  }

}
