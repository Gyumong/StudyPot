package com.studypot.back.utils;

import static com.studypot.back.constants.AuthConstant.AUTH_EXPIRATION;
import static com.studypot.back.constants.AuthConstant.AUTH_USER_ID;
import static com.studypot.back.constants.AuthConstant.AUTH_USER_NAME;

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

  public String createAccessToken(Long userId, String userName) {
    JwtBuilder builder = Jwts.builder();

    generatePayload(builder, userId, userName, jwtExpirationTimeMs);
    sign(builder);
    return builder.compact();
  }

  public String createRefreshToken(Long userId) {
    JwtBuilder builder = Jwts.builder();

    generatePayload(builder, userId, null, refreshExpirationTimeMs);
    sign(builder);

    return builder.compact();
  }

  public void setJwtExpirationTimeMs(int jwtExpirationTimeMs) {
    this.jwtExpirationTimeMs = jwtExpirationTimeMs;
  }

  private void generatePayload(JwtBuilder jwtBuilder, Long userId, String userName, int expirationTime) {
    if (userName != null) {
      jwtBuilder.claim(AUTH_USER_NAME, userName);
    }
    jwtBuilder
        .claim(AUTH_USER_ID, userId)
        .claim(AUTH_EXPIRATION,(new Date(System.currentTimeMillis()).getTime() + expirationTime) / 1000)
        .setIssuedAt(new Date(System.currentTimeMillis()));

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
      throw new MalformedJwtException("This token was incorrectly constructed", e);
    }
  }
}