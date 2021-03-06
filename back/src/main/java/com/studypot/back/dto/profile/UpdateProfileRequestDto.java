package com.studypot.back.dto.profile;

import com.studypot.back.domain.CategoryName;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateProfileRequestDto {

  private String name;

  private String location;

  private List<CategoryName> categories;

  private String introduction;

  private MultipartFile image;
}