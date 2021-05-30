package com.studypot.back.dto.user;

import com.studypot.back.domain.CategoryName;
import java.util.List;
import lombok.Data;

@Data
public class UserSignupRequestDto {

  private String email;

  private String password;

  private String name;

  private List<CategoryName> categories;

}