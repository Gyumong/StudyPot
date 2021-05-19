package com.studypot.back.applications;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.studypot.back.domain.Category;
import com.studypot.back.domain.CategoryRepository;
import com.studypot.back.domain.User;
import com.studypot.back.domain.UserCategory;
import com.studypot.back.domain.UserCategoryRepository;
import com.studypot.back.domain.UserRepository;
import com.studypot.back.dto.profile.ProfileResponseDto;
import com.studypot.back.dto.profile.UpdateProfileRequestDto;
import com.studypot.back.exceptions.UserNotFoundException;
import com.studypot.back.s3.S3Service;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileService {

  private final UserRepository userRepository;
  private final S3Service s3Service;
  private final CategoryRepository categoryRepository;
  private final UserCategoryRepository userCategoryRepository;

  public ProfileResponseDto getProfile(Long userId) {
    User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    return user.getProfile();
  }

  public ProfileResponseDto updateProfile(Long userId, UpdateProfileRequestDto updateProfileRequestDto) throws IOException {
    //TODO: PATCH 요청에 맞게 들어오는 key값만 변경하도록 바꾸기
    String fileUrl = uploadToS3(updateProfileRequestDto.getImage());
    User updateUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    saveCategories(updateProfileRequestDto.getCategories(), updateUser);
    ProfileResponseDto profileResponseDto = updateUser.updateProfile(updateProfileRequestDto, fileUrl);
    userRepository.save(updateUser);

    return profileResponseDto;

  }

  private String uploadToS3(MultipartFile multipartFile) throws IOException {
    String fileName = createFileName(multipartFile.getOriginalFilename());
    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentType(multipartFile.getContentType());

    InputStream inputStream = multipartFile.getInputStream();

    return s3Service.uploadFile(fileName, inputStream, objectMetadata);
  }

  private String createFileName(String name) {
    return UUID.randomUUID().toString().concat(fileNameExtension(name));
  }

  private String fileNameExtension(String name) {
    try {
      return name.substring(name.lastIndexOf("."));
    } catch (StringIndexOutOfBoundsException e) {
      throw new IllegalArgumentException(String.format("not supported file: %s", name));
    }
  }

  private void saveCategories(List<String> categories, User user) {
    for (String c : categories) {
      Category category = categoryRepository.findByName(c).orElse(
          categoryRepository.save(Category.builder().name(c).build())
      );
      userCategoryRepository.save(UserCategory.builder().user(user).Category(category).build());
    }
  }

}
