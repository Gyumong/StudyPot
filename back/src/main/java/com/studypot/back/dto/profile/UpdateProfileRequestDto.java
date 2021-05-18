package com.studypot.back.dto.profile;

import com.studypot.back.domain.UserCategory;
import java.util.List;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Data
public class UpdateProfileRequestDto {

  private String name;
  private String location;
  private List<UserCategory> categories;
  private String introduction;
  private MultipartFile image;
}
