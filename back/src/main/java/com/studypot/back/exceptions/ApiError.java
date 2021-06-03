package com.studypot.back.exceptions;

import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiError {

  private LocalDateTime timestamp;

  private HttpStatus status;

  private String message;

  private String location;

  public ApiError(LocalDateTime timestamp, HttpStatus status, String message, String location) {
    super();
    this.timestamp = timestamp;
    this.status = status;
    this.message = message;
    this.location = location;
  }

  @Override
  public String toString() {
    return "ApiError{" + "\n" +
        "timestamp=" + timestamp +
        "," + "\n" + " status = " + status +
        "," + "\n" + " message='" + message + '\'' +
        "," + "\n" + " location='" + location + '\'' + "\n" +
        '}';
  }
}
