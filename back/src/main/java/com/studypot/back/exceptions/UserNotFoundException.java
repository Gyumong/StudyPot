package com.studypot.back.exceptions;


public class UserNotFoundException extends RuntimeException{

  public UserNotFoundException() {
    super("User not found");
  }
}
