package com.studypot.back.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.security.Key;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private final Key key;

  public JwtUtil(@Value("${jwt.secret}") String secretKey) {
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

  public Claims getClaims(String token) {
    JwtParser parser = Jwts.parserBuilder()
        .setSigningKey(key)
        .build();

    try {
      return parser.parseClaimsJws(token).getBody();
    } catch (SignatureException e) {

      return null;
    }
  }
}
