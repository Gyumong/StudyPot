package com.studypot.back.exceptions;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.RequestDispatcher;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;

@Component
public class CustomErrorAttributes extends DefaultErrorAttributes {

  @Override
  public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
    Map<String, Object> errorAttributes = new LinkedHashMap<>();
    addTimeStamp(errorAttributes);
    addMessage(errorAttributes, getError(webRequest));
    addPath(errorAttributes, webRequest);
    addLocale(errorAttributes, webRequest);
    return errorAttributes;
  }

  private void addTimeStamp(Map<String, Object> errorAttributes) {
    errorAttributes.put("timestamp", new Date());
  }

  private void addMessage(Map<String, Object> errorAttributes, Throwable error) {
    if (error != null) {
      errorAttributes.put("message", error.getLocalizedMessage());
    } else {
      errorAttributes.put("message", "NOT FOUND");
    }
    
  }

  private void addLocale(Map<String, Object> errorAttributes, WebRequest webRequest) {
    errorAttributes.put("location", webRequest.getLocale());
  }

  private void addPath(Map<String, Object> errorAttributes, RequestAttributes requestAttributes) {
    String path = (String) requestAttributes.getAttribute(RequestDispatcher.ERROR_REQUEST_URI, RequestAttributes.SCOPE_REQUEST);

    if (path != null) {
      errorAttributes.put("path", path);
    }
  }
}
