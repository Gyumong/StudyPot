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

  @Value("${jwt.jwtExpirationTimeMs}")
  private int jwtExpirationTimeMs;

  @Value("${jwt.refreshExpirationTimeMs}")
  private int refreshExpirationTimeMs;

  public JwtUtil(
      @Value("${jwt.secret}") String secretKey
  ) {
    this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
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
    JwtBuilder builder = Jwts.builder();

    generatePayload(builder, userId, userName);
    sign(builder);

    return builder
        .compact();
  }

  private void generatePayload(JwtBuilder jwtBuilder, Long userId, String userName) {
    jwtBuilder
        .claim("userId", userId)
        .claim("userName", userName)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationTimeMs));
  }

  private void sign(JwtBuilder jwtBuilder) {
    jwtBuilder.signWith(key, SignatureAlgorithm.HS256);
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