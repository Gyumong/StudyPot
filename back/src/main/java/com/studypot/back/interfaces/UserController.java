package com.studypot.back.interfaces;

import com.studypot.back.applications.UserService;
import com.studypot.back.domain.User;
import java.net.URI;
import java.net.URISyntaxException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  private UserService userService;

  //TODO: 회원가입 구현

  @PostMapping("/signup")
  public ResponseEntity<?> create(
      @RequestBody User resource
  ) throws URISyntaxException {
    String name = resource.getName();
    String email = resource.getEmail();
    String password = resource.getPassword();

    userService.registerUser(name, email, password);

    String url = "/users/1";

    System.out.println("GOOD");
    return ResponseEntity.created(new URI(url)).body("{}");
  }

}
