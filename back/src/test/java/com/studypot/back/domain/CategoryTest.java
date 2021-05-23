package com.studypot.back.domain;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.MockitoAnnotations.openMocks;

import com.studypot.back.domain.Category.EnumCategory;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class CategoryTest {

  @BeforeEach
  public void setUp() {
    openMocks(this);
  }

  @Test
  public void get() {
    List<EnumCategory> categories = new ArrayList<>();
    categories.add(EnumCategory.INTERVIEW);

    assertThat(categories.get(0).getKey(), is("INTERVIEW"));
    assertThat(categories.get(0).getCategoryName(), is("면접"));
  }


}
