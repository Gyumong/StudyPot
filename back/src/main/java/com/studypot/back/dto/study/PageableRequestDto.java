package com.studypot.back.dto.study;

import com.studypot.back.domain.CategoryName;
import lombok.Data;

@Data
public class PageableRequestDto implements InfinityScrollRequest {

  private Long lastId;

  private CategoryName categoryName;

  private Integer size = 12;

  public boolean isFirst() {

    return this.lastId == null;
  }

  public boolean isEntireCategory() {
    
    return this.categoryName == null;
  }

}