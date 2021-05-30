package com.studypot.back.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryName {

  IT("IT"),
  CS("CS"),
  INTERVIEW("면접");

  private final String value;

}