package com.studypot.back.dto;

import com.studypot.back.domain.Category.EnumCategory;
import lombok.Getter;

@Getter
public class CategoryResponseDto {

  private String key;
  private String value;

  public CategoryResponseDto(EnumCategory enumCategory) {
    this.key = enumCategory.getKey();
    this.value = enumCategory.getCategoryName();
  }
}
