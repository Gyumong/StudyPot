package com.studypot.back.dto.profile;

import java.util.List;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class UpdateProfileRequestDto {

  private String name;

  private String location;

  private List<String> categories;

  private String introduction;

  private MultipartFile image;
}
