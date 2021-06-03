package com.studypot.back.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
      HttpRequestMethodNotSupportedException ex,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest request) {
    ApiError apiError = new ApiError(
        LocalDateTime.now(),
        HttpStatus.METHOD_NOT_ALLOWED,
        ex.getLocalizedMessage(),
        request.getLocale().toString());
    log.error(String.valueOf(apiError));
    return new ResponseEntity<>(
        apiError, new HttpHeaders(), apiError.getStatus());
  }

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ExceptionHandler(ExpiredJwtException.class)
  public ApiError handleJwtExpired(ExpiredJwtException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.UNAUTHORIZED);
  }

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ExceptionHandler(NullTokenException.class)
  public ApiError handleNullToken(NullTokenException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.UNAUTHORIZED);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(WrongPasswordException.class)
  public ApiError handleWrongPassword(WrongPasswordException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.BAD_REQUEST);
  }

  @ResponseBody
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(UnregisteredEmailException.class)
  public ApiError handleUnregisteredEmail(UnregisteredEmailException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.BAD_REQUEST);
  }

  @ResponseBody
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(ExistEmailException.class)
  public ApiError handleExistEmail(ExistEmailException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.BAD_REQUEST);
  }

  @ResponseBody
  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(UserNotFoundException.class)
  public ApiError handleUserNotFound(UserNotFoundException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.NOT_FOUND);
  }

  private ApiError apiErrorResponse(RuntimeException e, WebRequest webRequest, HttpStatus httpStatus) {
    ApiError apiError = new ApiError(
        LocalDateTime.now(),
        httpStatus,
        e.getLocalizedMessage(),
        webRequest.getLocale().toString());
    log.warn(apiError.toString());
    return apiError;
  }

}
