package com.studypot.back.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private final Key key;

  private int jwtExpirationTimeMs;
  private int refreshExpirationTimeMs;

  public JwtUtil(@Value("${jwt.secret}") String secretKey) {
    this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
  }

  @Value("${jwt.jwtExpirationTimeMs}")
  public void setJwtExpirationTimeMs(int jwtExpirationTimeMs) {
    this.jwtExpirationTimeMs = jwtExpirationTimeMs;
  }

  @Value("${jwt.refreshExpirationTimeMs}")
  public void setRefreshExpirationTimeMs(int refreshExpirationTimeMs) {
    this.refreshExpirationTimeMs = refreshExpirationTimeMs;
  }

  public String createToken(Long userId, String userName) {
    JwtBuilder builder = Jwts.builder()
        .claim("userId", userId)
        .claim("userName", userName)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationTimeMs));

    return builder
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public String createRefreshToken(Long userId, String userName) {
    JwtBuilder builder = Jwts.builder()
        .claim("userId", userId)
        .claim("userName", userName)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTimeMs));

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
      throw new SignatureException("Bad Signature", e);
    } catch (MalformedJwtException e) {
      throw new MalformedJwtException("This token was not correctly constructed", e);
    }
  }
}