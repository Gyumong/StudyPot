package com.studypot.back.exceptions;

import com.studypot.back.constants.ErrorConstant;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Enumeration;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
      HttpRequestMethodNotSupportedException e,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest webRequest) {
    ServletWebRequest servletWebRequest = (ServletWebRequest) webRequest;
    ApiError apiError = apiErrorResponse(e, servletWebRequest, HttpStatus.METHOD_NOT_ALLOWED, ErrorConstant.METHOD_NOT_SUPPORTED);
    return new ResponseEntity<>(
        apiError, new HttpHeaders(), apiError.getStatus());
  }

  @Override
  protected ResponseEntity<Object> handleNoHandlerFoundException(
      NoHandlerFoundException e,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest webRequest) {
    ServletWebRequest servletWebRequest = (ServletWebRequest) webRequest;
    ApiError apiError = apiErrorResponse(e, servletWebRequest, HttpStatus.NOT_FOUND, ErrorConstant.PAGE_NOT_FOUND);
    return new ResponseEntity<>(
        apiError, new HttpHeaders(), apiError.getStatus());
  }

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ExceptionHandler(ExpiredJwtException.class)
  public ApiError handleJwtExpired(ExpiredJwtException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.UNAUTHORIZED, ErrorConstant.TOKEN_EXPIRED);
  }

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ExceptionHandler(NullTokenException.class)
  public ApiError handleNullToken(NullTokenException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.UNAUTHORIZED, ErrorConstant.NULL_TOKEN);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(WrongPasswordException.class)
  public ApiError handleWrongPassword(WrongPasswordException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.BAD_REQUEST, ErrorConstant.WRONG_PASSWORD);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(UnregisteredEmailException.class)
  public ApiError handleUnregisteredEmail(UnregisteredEmailException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.BAD_REQUEST, ErrorConstant.EMAIL_NOT_FOUND);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(ExistEmailException.class)
  public ApiError handleExistEmail(ExistEmailException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.BAD_REQUEST, ErrorConstant.EMAIL_EXIST);
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(UserNotFoundException.class)
  public ApiError handleUserNotFound(UserNotFoundException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.NOT_FOUND, ErrorConstant.USER_NOT_FOUND);
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(StudyNotFoundException.class)
  public ApiError handleStudyNotFound(StudyNotFoundException e, WebRequest webRequest) {
    return apiErrorResponse(e, webRequest, HttpStatus.NOT_FOUND, ErrorConstant.STUDY_NOT_FOUND);
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> handleException(Exception e, HttpServletRequest webRequest) throws IOException {
    log.error(
        "🚨 알 수 없는 에러가 발생했습니다.\n" +
            "url={} {}{}\n" +
            "headers={}\n" +
            "body={}"
        ,
        webRequest.getMethod(), webRequest.getRequestURI(), webRequest.getQueryString() != null ? "?" + webRequest.getQueryString() : "",
        requestHeaderString(webRequest),
        webRequest.getReader().lines().collect(Collectors.joining("\n")),
        e
    );

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
  }

  private ApiError apiErrorResponse(Exception e, WebRequest webRequest, HttpStatus httpStatus, String errorConstant) {

    ServletWebRequest servletWebRequest = (ServletWebRequest) webRequest;

    ApiError apiError = new ApiError(
        LocalDateTime.now(),
        httpStatus,
        errorConstant,
        e.getLocalizedMessage(),
        servletWebRequest.getRequest().getRequestURI());
    log.warn(apiError.toString());
    return apiError;
  }

  private String requestHeaderString(HttpServletRequest request) {
    StringBuilder headerString = new StringBuilder("{");

    Enumeration<String> headerNames = request.getHeaderNames();
    while (headerNames.hasMoreElements()) {
      String headerName = headerNames.nextElement();

      headerString.append(headerName);
      headerString.append("=");
      headerString.append(request.getHeader(headerName));
      headerString.append(", ");
    }

    headerString.append("}");

    return headerString.toString();
  }

}
