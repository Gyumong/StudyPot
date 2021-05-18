package com.studypot.back.interfaces;

import com.studypot.back.applications.UserService;
import com.studypot.back.dto.user.UserSignupRequestDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api("회원가입")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/signup")
  @ApiOperation("회원가입")
  @ResponseStatus(HttpStatus.CREATED)
  public void create(@RequestBody UserSignupRequestDto resource) {
    userService.registerUser(resource);
  }

}
