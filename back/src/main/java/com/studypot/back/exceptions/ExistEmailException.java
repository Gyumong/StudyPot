package com.studypot.back.exceptions;

public class ExistEmailException extends RuntimeException{

  public ExistEmailException(String email) {
    super("duplicated email" + email);
  }
}
