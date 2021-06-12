package com.studypot.back.exceptions;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ApiError {

  private final LocalDateTime timestamp;

  private final HttpStatus status;

  private final String errorCode;

  private final String message;

  private final String path;

  @Override
  public String toString() {
    return "ApiError{" + "\n" +
        "timestamp=" + timestamp +
        "," + "\n" + " status = " + status +
        "," + "\n" + " errorCode='" + errorCode + '\'' +
        "," + "\n" + " message='" + message + '\'' +
        "," + "\n" + " path='" + path + '\'' + "\n" +
        '}';
  }
}
