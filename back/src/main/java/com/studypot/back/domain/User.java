package com.studypot.back.domain;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
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

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<UserCategory> categories;

  @Setter
  private String introduction;

  @Setter
  private String imageUrl;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<StudyMember> participateStudyList;

}
