package com.studypot.back.domain;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.MockitoAnnotations.openMocks;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class UserCategoryTest {

  @BeforeEach
  public void setUp() {
    openMocks(this);
  }

  @Test
  public void getCategoryName() {
    List<CategoryName> categories = new ArrayList<>();
    categories.add(CategoryName.JOB_INTERVIEW);

    assertThat(categories.get(0).name(), is("JOB_INTERVIEW"));
    assertThat(categories.get(0).getValue(), is("취업/면접"));
  }

}
