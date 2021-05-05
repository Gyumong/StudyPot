package com.studypot.back.domain;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.studypot.back.dto.user.ProfileProjection;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@DataJpaTest
@ExtendWith(SpringExtension.class)
class UserRepositoryTest {

  @Autowired
  private UserRepository userRepository;

  @Test
  public void findByName() {
    String name = "leo";

    User user = User.builder().email("test@naver.com").name("leo").password("1234").build();
    userRepository.save(user);

    ProfileProjection dto = userRepository.findByName(name);

    assertNotNull(dto);

    assertThat(dto.getName(), is("leo"));
  }

}