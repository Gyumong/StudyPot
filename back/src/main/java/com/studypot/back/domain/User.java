package com.studypot.back.domain;

import com.studypot.back.dto.profile.ProfileResponseDto;
import com.studypot.back.dto.profile.UpdateProfileRequestDto;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
  private Long id;

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
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<UserCategory> categories;

  @Setter
  private String introduction;

  @Setter
  private String image;


  public ProfileResponseDto getProfile() {
    return new ProfileResponseDto(this.name, this.location, this.categories, this.introduction, this.image);
  }

  public ProfileResponseDto updateProfile(UpdateProfileRequestDto updateProfileRequestDto, String imageUrl) {
    this.name = updateProfileRequestDto.getName();
    this.location = updateProfileRequestDto.getLocation();
    this.introduction = updateProfileRequestDto.getIntroduction();
    this.image = imageUrl;

    return new ProfileResponseDto(this.name, this.location, this.categories, this.introduction, this.image);
  }
}
