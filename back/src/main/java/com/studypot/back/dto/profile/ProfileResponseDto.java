package com.studypot.back.dto.profile;


import com.studypot.back.domain.UserCategory;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProfileResponseDto {

  private String name;

  private String location;

  private List<UserCategory> categories;

  private String introduction;

  private String image;

}
