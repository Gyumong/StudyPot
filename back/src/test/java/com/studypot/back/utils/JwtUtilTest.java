package com.studypot.back.utils;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JwtUtilTest {

  private JwtUtil jwtUtil;

  private static final String SECRET = "123456789012345678901234567890123456";

  @BeforeEach
  public void setUp() {
    jwtUtil = new JwtUtil(SECRET);
  }

  @Test
  public void createAccessToken() {
    Long userId = 1L;
    String userName = "leo";
    String token = jwtUtil.createAccessToken(userId, userName);

    assertThat(token, containsString("."));
  }

  @Test
  public void getClaims() {

    Long userId = 1L;
    String userName = "leo";
    String token = jwtUtil.createAccessToken(userId, userName);

    Claims claims = jwtUtil.getClaims(token);

    assertThat(claims.get("userName"), is("leo"));
    assertThat(claims.get("userId", Long.class), is(1L));
  }

}