package com.studypot.back.dto.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProfileResponseDto {

  private String name;

  private String location;

  private String category;

  private String introduction;

  private String image;

}
