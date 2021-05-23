package com.studypot.back.domain;

import com.studypot.back.dto.user.ProfileResponseDto;
import com.studypot.back.dto.user.UpdateProfileRequestDto;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long Id;

  @Setter
  private String email;

  @Setter
  private String name;

  private String password;

  @ColumnDefault("0")
  private boolean isStaff;

  @ColumnDefault("1")
  private boolean isActive;

  @Setter
  private String location;

  @Setter
  private String category;

  @Setter
  private String introduction;

  @Setter
  private String image;


  public ProfileResponseDto updateProfile(UpdateProfileRequestDto updateProfileRequestDto, String fileUrl) {
    this.name = updateProfileRequestDto.getName();
    this.location = updateProfileRequestDto.getLocation();
    this.category = updateProfileRequestDto.getCategory();
    this.introduction = updateProfileRequestDto.getIntroduction();
    this.image = fileUrl;

    return new ProfileResponseDto(this.name, this.location, this.category, this.introduction, this.image);
  }
}
