package com.studypot.back.domain;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Study {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String locatedAt;

  @CreatedDate
  private LocalDateTime createdAt;

  @LastModifiedDate
  private LocalDateTime updatedAt;

  private String title;

  private String content;

  private Integer maxNumber;

  private String thumbnail;

  @Enumerated(value = EnumType.STRING)
  private MeetingType meetingType;

  @Enumerated(value = EnumType.STRING)
  private StudyStatus status;

  private Long leaderUserId;

  @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
  private List<StudyMember> members;

  @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
  private List<StudyCategory> categories;

}
