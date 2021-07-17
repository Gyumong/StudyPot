package com.studypot.back.applications;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.MockitoAnnotations.openMocks;

import com.studypot.back.applications.study.EntireCategoryAfterPageStudyService;
import com.studypot.back.applications.study.EntireCategoryFirstPageStudyService;
import com.studypot.back.applications.study.SelectedCategoryAfterPageStudyService;
import com.studypot.back.applications.study.SelectedCategoryFirstPageStudyService;
import com.studypot.back.domain.CategoryName;
import com.studypot.back.domain.MeetingType;
import com.studypot.back.domain.Study;
import com.studypot.back.domain.StudyCategory;
import com.studypot.back.domain.StudyCategoryRepository;
import com.studypot.back.domain.StudyMember;
import com.studypot.back.domain.StudyRepository;
import com.studypot.back.domain.StudyStatus;
import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.study.InfinityScrollResponseDto;
import com.studypot.back.dto.study.PageableRequestDto;
import com.studypot.back.dto.study.StudyCreateRequestDto;
import com.studypot.back.dto.study.StudyDetailResponseDto;
import com.studypot.back.s3.S3Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

class StudyServiceTest {

  private StudyService studyService;

  @Mock
  private StudyRepository studyRepository;

  @Mock
  private UserRepository userRepository;

  @Mock
  private S3Service s3Service;

  @Mock
  private StudyCategoryRepository studyCategoryRepository;

  private Long userId;

  private User mockUser;

  private Study mockStudy;

  private List<StudyCategory> studyCategoryList = new ArrayList<>();

  private List<StudyMember> studyMemberList = new ArrayList<>();

  @Mock
  private EntireCategoryFirstPageStudyService entireCategoryFirstPageStudyService;

  @Mock
  private EntireCategoryAfterPageStudyService entireCategoryAfterPageStudyService;

  @Mock
  private SelectedCategoryFirstPageStudyService selectedCategoryFirstPageStudyService;

  @Mock
  private SelectedCategoryAfterPageStudyService selectedCategoryAfterPageStudyService;

  @BeforeEach
  public void setUp() {
    openMocks(this);
    this.studyService = new StudyService(
        studyRepository,
        s3Service,
        userRepository,
        studyCategoryRepository,
        entireCategoryFirstPageStudyService,
        entireCategoryAfterPageStudyService,
        selectedCategoryFirstPageStudyService,
        selectedCategoryAfterPageStudyService
    );
    this.userId = 1L;
    this.studyCategoryList.add(StudyCategory.builder().category(CategoryName.JOB_INTERVIEW).build());
    this.studyMemberList.add(StudyMember.builder().userId(101L).build());
    mockUser = User.builder().build();
    mockStudy = Study.builder()
        .status(StudyStatus.OPEN)
        .meetingType(MeetingType.ONLINE)
        .categories(studyCategoryList)
        .content("test")
        .leaderUserId(userId)
        .members(studyMemberList)
        .build();
  }

  @Test
  @DisplayName("스터디_생성_결과_확인")
  public void addStudy() throws IOException {

    given(studyRepository.save(any(Study.class))).willReturn(mockStudy);

    List<CategoryName> categories = new ArrayList<>();
    categories.add(CategoryName.JOB_INTERVIEW);
    StudyCreateRequestDto studyCreateRequestDto = new StudyCreateRequestDto();
    studyCreateRequestDto.setCategories(categories);

    Study study = studyService.addStudy(userId, studyCreateRequestDto);

    assertThat(study.getLeaderUserId(), is(1L));
    assertThat(study.getStatus().getValue(), is("Open"));
  }

  @Test
  @DisplayName("스터디_상세_조회_확인")
  public void getStudy() {
    given(studyRepository.findById(any())).willReturn(Optional.ofNullable(mockStudy));
    given(userRepository.findById(any())).willReturn(Optional.ofNullable(mockUser));

    StudyDetailResponseDto studyDetailResponseDto = studyService.getStudy(1L);

    assertThat(studyDetailResponseDto.getContent(), is("test"));
  }

  @Test
  @DisplayName("스터디_멤버_인원_확인")
  public void checkStudyMemberSize() {
    this.studyMemberList.add(StudyMember.builder().userId(201L).build());

    given(studyRepository.findById(any())).willReturn(Optional.ofNullable(mockStudy));
    given(userRepository.findById(any())).willReturn(Optional.ofNullable(mockUser));

    StudyDetailResponseDto studyDetailResponseDto = studyService.getStudy(1L);

    assertThat(studyDetailResponseDto.getParticipatingNumber(), is(2));
  }

  @Test
  @DisplayName("ResponseDto_응답_확인")
  public void getStudyList() {
    List<Study> studyList = new ArrayList<>();
    studyList.add(mockStudy);
    Page<Study> page = new PageImpl<>(studyList);

    given(studyRepository.findAll(PageRequest.of(0, 12, Sort.by(Direction.DESC, "createdAt")))).willReturn(page);
    given(studyRepository.getFirstBy()).willReturn(Optional.ofNullable(mockStudy));

    InfinityScrollResponseDto dto = studyService.getStudyList(new PageableRequestDto());

    assertThat(dto.getLastIdOfStudyList(), is(mockStudy.getId()));
  }
}