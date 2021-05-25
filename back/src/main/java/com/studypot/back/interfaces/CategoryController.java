package com.studypot.back.interfaces;

import com.studypot.back.domain.Category.CategoryName;
import com.studypot.back.dto.CategoryResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api("관심사")
public class CategoryController {

  @GetMapping("/categories")
  @ApiOperation("관심사 목록 조회")
  public List<CategoryResponseDto> getCategoryValue() {
    //TODO: 현재는 매 요청마다 새로 Array를 생성. 추후에는 빈으로 등록하여 요청 들어올 때 만들어놓은 빈을 반환하게 만들기! 전체도 반환할 수 있게 넣기!
    return Arrays
        .stream(CategoryName.values())
        .map(CategoryResponseDto::new)
        .collect(Collectors.toList());
  }
}
