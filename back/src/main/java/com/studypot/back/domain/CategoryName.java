package com.studypot.back.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryName {

  COMPUTER_IT("컴퓨터/IT"),
  CERT_TEST("자격증/시험"),
  JOB_INTERVIEW("취업/면접"),
  LANGUAGE("어학"),
  EXAM("입시");

  private final String value;

}