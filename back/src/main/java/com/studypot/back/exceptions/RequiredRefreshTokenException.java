package com.studypot.back.exceptions;

public class RequiredRefreshTokenException extends RuntimeException{

  public RequiredRefreshTokenException(String message) {
    super(message);
  }
}
