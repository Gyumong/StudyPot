package com.studypot.back.dto.user;

import lombok.Getter;

@Getter
public class UpdateProfileRequestDto {

  private String name;
  private String location;
  private String category;
  private String introduction;
  private String image;
}
