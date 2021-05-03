package com.studypot.back.dto.session;

import lombok.Data;
import lombok.Setter;

@Data
public class SessionResponseDto {

  @Setter
  private String accessToken;

  @Setter
  private String refreshToken;

}
