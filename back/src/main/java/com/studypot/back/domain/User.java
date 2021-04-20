package com.studypot.back.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class User {

  @Id
  @GeneratedValue
  private Long Id;

  @Setter
  private String email;

  @Setter
  private String name;

  private String password;


}
