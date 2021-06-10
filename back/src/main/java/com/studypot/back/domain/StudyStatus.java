package com.studypot.back.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StudyStatus {

  OPEN("Open"),
  CLOSE("Close");

  private final String value;
}
