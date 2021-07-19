package com.studypot.back.applications;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.studypot.back.applications.study.GetStudyService;
import com.studypot.back.domain.Study;
import com.studypot.back.domain.StudyCategory;
import com.studypot.back.domain.StudyCategoryRepository;
import com.studypot.back.domain.StudyRepository;
import com.studypot.back.domain.User;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.study.InfinityScrollResponseDto;
import com.studypot.back.dto.study.PageableRequestDto;
import com.studypot.back.dto.study.StudyCreateRequestDto;
import com.studypot.back.dto.study.StudyDetailResponseDto;
import com.studypot.back.exceptions.StudyNotFoundException;
import com.studypot.back.exceptions.UserNotFoundException;
import com.studypot.back.s3.S3Service;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class StudyService {

  private final StudyRepository studyRepository;

  private final S3Service s3Service;

  private final UserRepository userRepository;

  private final StudyCategoryRepository studyCategoryRepository;

  @Qualifier("entireCategoryFirstPageStudyService")
  private final GetStudyService entireCategoryFirstPageStudyService;

  @Qualifier("entireCategoryAfterPageStudyService")
  private final GetStudyService entireCategoryAfterPageStudyService;

  @Qualifier("selectedCategoryFirstPageStudyService")
  private final GetStudyService selectedCategoryFirstPageStudyService;

  @Qualifier("selectedCategoryAfterPageStudyService")
  private final GetStudyService selectedCategoryAfterPageStudyService;

  public Study addStudy(Long userId, StudyCreateRequestDto studyCreateRequestDto) throws IOException {
    String thumbnailUrl = createImageUrlOrNull(studyCreateRequestDto.getThumbnail());

    Study study = studyCreateRequestDto.buildStudy(userId, thumbnailUrl);
    study.addToStudyMemberList(userId);
    study.createStudyCategoryList(studyCreateRequestDto.getCategories());

    return studyRepository.save(study);
  }

  public StudyDetailResponseDto getStudy(Long studyId) {
    Study study = studyRepository.findById(studyId).orElseThrow(StudyNotFoundException::new);
    User leader = userRepository.findById(study.getLeaderUserId()).orElseThrow(UserNotFoundException::new);

    return new StudyDetailResponseDto(study, leader);
  }

  public InfinityScrollResponseDto getStudyList(PageableRequestDto pageableRequestDto) {
    PageRequest pageRequest = PageRequest.of(0, pageableRequestDto.getSize(), sortCreatedAt());
    List<Study> studyList = getStudies(pageableRequestDto, pageRequest);

    return createInfinityScrollResponseDto(pageableRequestDto, studyList);
  }

  private String createImageUrlOrNull(MultipartFile thumbnail) throws IOException {
    if (thumbnail != null) {
      return uploadToS3(thumbnail);
    }
    return null;
  }

  private String uploadToS3(MultipartFile multipartFile) throws IOException {
    String fileName = createUUIDFileName(multipartFile.getOriginalFilename());
    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentType(multipartFile.getContentType());
    InputStream inputStream = multipartFile.getInputStream();

    return s3Service.uploadFile(fileName, inputStream, objectMetadata);
  }

  private String createUUIDFileName(String name) {
    return UUID.randomUUID().toString().concat(fileNameExtension(name));
  }

  private String fileNameExtension(String name) {
    try {
      return name.substring(name.lastIndexOf("."));
    } catch (StringIndexOutOfBoundsException e) {
      throw new IllegalArgumentException(String.format("not supported file: %s", name));
    }
  }

  private Sort sortCreatedAt() {

    return Sort.by(Direction.DESC, "createdAt");
  }

  private List<Study> getStudies(PageableRequestDto pageableRequestDto, PageRequest pageRequest) {

    if (pageableRequestDto.isFirst() && pageableRequestDto.isEntireCategory()) {

      return entireCategoryFirstPageStudyService.getStudyList(pageableRequestDto, pageRequest);
    }

    if (pageableRequestDto.isFirst()) {

      return selectedCategoryFirstPageStudyService.getStudyList(pageableRequestDto, pageRequest);
    }

    if (pageableRequestDto.isEntireCategory()) {

      return entireCategoryAfterPageStudyService.getStudyList(pageableRequestDto, pageRequest);
    }

    return selectedCategoryAfterPageStudyService.getStudyList(pageableRequestDto, pageRequest);
  }

  private InfinityScrollResponseDto createInfinityScrollResponseDto(PageableRequestDto pageableRequestDto, List<Study> studyList) {
    if (pageableRequestDto.isEntireCategory()) {

      Study study = studyRepository.getFirstBy().orElseThrow(StudyNotFoundException::new);

      return new InfinityScrollResponseDto(studyList, study);
    } else {

      StudyCategory lastStudyCategory = studyCategoryRepository.getFirstByCategory(pageableRequestDto.getCategoryName())
          .orElseThrow(StudyNotFoundException::new);

      return new InfinityScrollResponseDto(studyList, lastStudyCategory.getStudy());
    }
  }
}
