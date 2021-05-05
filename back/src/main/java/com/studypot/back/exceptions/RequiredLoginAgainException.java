package com.studypot.back.exceptions;

public class RequiredLoginAgainException extends RuntimeException{

  public RequiredLoginAgainException(String message) {
    super(message);
  }
}
