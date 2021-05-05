package com.studypot.back.dto.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProfileResponseDto {

  private String getName;

  private String getLocation;

  private String getCategory;

  private String getIntroduction;

  private String getImage;

}
