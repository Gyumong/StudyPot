package com.studypot.back.interfaces;

import static com.studypot.back.constants.AuthConstant.AUTH_USER_ID;
import static com.studypot.back.constants.AuthConstant.AUTH_USER_NAME;

import com.studypot.back.applications.UserService;
import com.studypot.back.dto.user.ProfileProjection;
import com.studypot.back.dto.user.ProfileResponseDto;
import com.studypot.back.dto.user.UpdateProfileRequestDto;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

  private final UserService userService;

  public ProfileController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/userInfo")
  public ProfileProjection getUser(Authentication authentication) {

    Claims claims = (Claims) authentication.getPrincipal();
    String name = claims.get(AUTH_USER_NAME, String.class);
    return userService.getProfile(name);
  }

  @PatchMapping("/userInfo")
  public ProfileResponseDto updateUser(
      Authentication authentication,
      @RequestBody UpdateProfileRequestDto updateProfileRequestDto) {

    Claims claims = (Claims) authentication.getPrincipal();
    Long userId = claims.get(AUTH_USER_ID, Long.class);

    return userService.updateProfile(userId, updateProfileRequestDto);
  }

}
