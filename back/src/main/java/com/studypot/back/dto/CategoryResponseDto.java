package com.studypot.back.dto;

import com.studypot.back.domain.Category.CategoryName;
import lombok.Getter;

@Getter
public class CategoryResponseDto {

  private final String key;
  private final String value;

  public CategoryResponseDto(CategoryName categoryName) {
    this.key = categoryName.name();
    this.value = categoryName.getValue();
  }
}
