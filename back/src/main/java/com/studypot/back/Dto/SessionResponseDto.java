package com.studypot.back.Dto;

import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
public class SessionResponseDto {

  @Setter
  private String accessToken;

}
