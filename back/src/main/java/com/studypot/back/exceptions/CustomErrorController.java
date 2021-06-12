package com.studypot.back.exceptions;

import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class CustomErrorController extends BasicErrorController {

  public CustomErrorController(ErrorAttributes errorAttributes,
      ErrorProperties errorProperties) {
    super(errorAttributes, errorProperties);
  }

  @Override
  public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
    log(request);
    return super.error(request);
  }

  private void log(HttpServletRequest request) {
    log.error("error Attributes: " + getErrorAttributes(request, null));
  }

}
