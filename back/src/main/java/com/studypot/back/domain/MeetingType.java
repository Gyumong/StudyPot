package com.studypot.back.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MeetingType {

  ONLINE("온라인"),
  OFFLINE("오프라인"),
  ONANDOFFLINE("온/오프라인");

  private final String value;
  
}
