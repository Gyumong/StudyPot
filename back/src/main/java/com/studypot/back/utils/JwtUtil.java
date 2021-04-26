package com.studypot.back.utils;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

public class JwtUtil {

  Key key;

  public JwtUtil(String secretKey) {
    this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
  }

  public String createToken(Long userId, String userName) {
    JwtBuilder builder = Jwts.builder()
        .claim("userId", userId)
        .claim("userName", userName);

    return builder
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }
}
