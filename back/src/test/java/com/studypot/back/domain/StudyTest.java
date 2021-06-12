package com.studypot.back.domain;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class StudyTest {

  @Test
  @DisplayName("리더_생성_확인")
  public void getLeader() {
    User leaderUser = User.builder().id(101L).build();
    Study study = Study.builder().leaderUserId(leaderUser.getId()).build();

    assertThat(study.getLeaderUserId(), is(101L));
  }

}
