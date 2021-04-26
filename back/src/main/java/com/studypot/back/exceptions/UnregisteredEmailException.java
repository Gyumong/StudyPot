package com.studypot.back.exceptions;

public class UnregisteredEmailException extends RuntimeException {

  public UnregisteredEmailException(String email) {
    super("This email is unregistered: " + email);
  }

}
