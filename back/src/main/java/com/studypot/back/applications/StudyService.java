package com.studypot.back.applications;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.studypot.back.domain.CategoryName;
import com.studypot.back.domain.Study;
import com.studypot.back.domain.StudyCategory;
import com.studypot.back.domain.StudyCategoryRepository;
import com.studypot.back.domain.StudyMember;
import com.studypot.back.domain.StudyMemberRepository;
import com.studypot.back.domain.StudyRepository;
import com.studypot.back.dto.study.StudyCreateRequestDto;
import com.studypot.back.s3.S3Service;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class StudyService {

  private final StudyRepository studyRepository;

  private final StudyMemberRepository studyMemberRepository;

  private final StudyCategoryRepository studyCategoryRepository;

  private final S3Service s3Service;


  public Study addStudy(Long userId, StudyCreateRequestDto studyCreateRequestDto) throws IOException {
    String thumbnailUrl = createImageUrlOrNull(studyCreateRequestDto.getThumbnail());
    Study savedStudy = studyRepository.save(studyCreateRequestDto.buildStudy(userId, thumbnailUrl));

    studyMemberRepository.save(StudyMember.builder().study(savedStudy).userId(userId).build());
    saveStudyCategories(studyCreateRequestDto.getCategories(), savedStudy);

    return savedStudy;
  }

  private String createImageUrlOrNull(MultipartFile thumbnail) throws IOException {
    if (thumbnail != null) {
      return uploadToS3(thumbnail);
    }
    return null;
  }

  private void saveStudyCategories(List<CategoryName> categories, Study study) {
    Set<StudyCategory> studyCategorySet = new HashSet<>();

    for (CategoryName categoryName : categories) {

      studyCategorySet.add(
          StudyCategory.builder()
              .study(study)
              .category(categoryName)
              .build());
    }
    studyCategoryRepository.saveAll(studyCategorySet);
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
}
