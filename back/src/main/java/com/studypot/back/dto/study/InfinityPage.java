package com.studypot.back.dto.study;

import java.util.List;

public interface InfinityPage<T> {

  List<T> getContents();

  Long getLastIdOfStudyList();

  boolean isLast();
}
