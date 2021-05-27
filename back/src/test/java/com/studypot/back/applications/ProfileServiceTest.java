package com.studypot.back.applications;

import static org.mockito.MockitoAnnotations.openMocks;

import com.studypot.back.domain.UserCategoryRepository;
import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.s3.S3Service;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.springframework.context.annotation.Import;

@Import({UserRepository.class})
class ProfileServiceTest {

  private ProfileService profileService;

  @Mock
  private UserRepository userRepository;

  @Mock
  private S3Service s3Service;

  @Mock
  private UserCategoryRepository userCategoryRepository;

  private User mockUser;

  private List<String> categoryList = new ArrayList<>();


  @BeforeEach
  public void setUp() {
    openMocks(this);
  }

}