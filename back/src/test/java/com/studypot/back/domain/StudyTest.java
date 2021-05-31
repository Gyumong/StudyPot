package com.studypot.back.domain;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.core.Is.is;

import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

public class StudyTest {

  @Test
  public void getLeader() {
    User leaderUser = User.builder().id(101L).build();
    Study study = Study.builder().leaderUserId(leaderUser.getId()).build();

    assertThat(study.getLeaderUserId(), is(101L));
  }

  @Test
  public void createDate() {
    Study study = Study.builder().createdAt(LocalDateTime.now()).build();
    assertThat(study.getCreatedAt().toString(), containsString("2021"));

  }

}
