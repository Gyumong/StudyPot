package com.studypot.back.dto.user;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateProfileRequestDto {

  private String name;
  private String location;
  private String category;
  private String introduction;
  private MultipartFile image;
}
