package com.studypot.back.interfaces;

import com.studypot.back.applications.ProfileService;
import com.studypot.back.auth.UserId;
import com.studypot.back.auth.UserName;
import com.studypot.back.dto.user.ProfileProjection;
import com.studypot.back.dto.user.ProfileResponseDto;
import com.studypot.back.dto.user.UpdateProfileRequestDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api("프로필")
@RequiredArgsConstructor
@Slf4j
public class ProfileController {

  private final ProfileService profileService;

  @GetMapping("/user")
  @ApiOperation("유저 정보 조회")
  public ProfileProjection getUser(@UserName String userName) {

    return profileService.getProfile(userName);
  }

  @PatchMapping("/user")
  @ApiOperation("유저 정보 수정")
  public ProfileResponseDto updateUser(
      @UserId Long userId,
      UpdateProfileRequestDto updateProfileRequestDto) throws IOException {

    return profileService.updateProfile(userId, updateProfileRequestDto);
  }

}
