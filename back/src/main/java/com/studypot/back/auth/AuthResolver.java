package com.studypot.back.auth;

import static com.studypot.back.constants.AuthConstant.AUTHORIZATION;
import static com.studypot.back.constants.AuthConstant.AUTH_EXPIRATION;
import static com.studypot.back.constants.AuthConstant.AUTH_USER_NAME;
import static com.studypot.back.constants.AuthConstant.BEARER;

import com.studypot.back.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import java.util.Date;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;

public abstract class AuthResolver implements HandlerMethodArgumentResolver {

  private final JwtUtil jwtUtil;

  public AuthResolver(JwtUtil jwtUtil) {
    this.jwtUtil = jwtUtil;
  }

   protected Authentication getAuthentication(NativeWebRequest request) {
    String token = request.getHeader(AUTHORIZATION);
    //todo: null and expired token handling
    if (token == null) {
      return null;
    }
    Claims claims = jwtUtil.getClaims(token.substring(BEARER.length()));

    if (isExpired(claims)) {

      if (claims.get(AUTH_USER_NAME) == null) {

        throw new ExpiredJwtException(null, null, "need login again.");
      }
      throw new ExpiredJwtException(null, null, "Refresh Token Required.");
    }
    return new UsernamePasswordAuthenticationToken(claims, null);

  }

  private boolean isExpired(Claims claims) {
    return claims.get(AUTH_EXPIRATION, Long.class) < new Date(System.currentTimeMillis()).getTime() / 1000;
  }

}
