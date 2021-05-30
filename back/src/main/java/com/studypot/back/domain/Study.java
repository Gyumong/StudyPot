package com.studypot.back.domain;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Study {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String locatedAt;

  private LocalDateTime createdAt;

  private String title;

  private String content;

  private Integer maxNumber;

  private String thumbnail;

  @OneToOne
  private User leader;

  @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
  private List<StudyMember> members;

  @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
  private List<StudyCategory> categories;
}
