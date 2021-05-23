package com.studypot.back.dto.user;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSignupRequestDto {

  private String email;

  private String password;

  private String name;

  private List<String> categories;

}