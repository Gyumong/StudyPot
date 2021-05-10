package com.studypot.back.interfaces;

import com.studypot.back.applications.UserService;
import com.studypot.back.auth.UserId;
import com.studypot.back.auth.UserName;
import com.studypot.back.dto.user.ProfileProjection;
import com.studypot.back.dto.user.ProfileResponseDto;
import com.studypot.back.dto.user.UpdateProfileRequestDto;
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
  public ProfileProjection getUser(@UserName String userName) {

    return userService.getProfile(userName);
  }

  @PatchMapping("/userInfo")
  public ProfileResponseDto updateUser(
      @UserId Long userId,
      @RequestBody UpdateProfileRequestDto updateProfileRequestDto) {

    return userService.updateProfile(userId, updateProfileRequestDto);
  }

}
