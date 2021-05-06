package com.studypot.back.filters;

import static com.studypot.back.constants.AuthConstant.AUTHORIZATION;
import static com.studypot.back.constants.AuthConstant.BEARER;

import com.studypot.back.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;
import java.util.Date;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

  private final JwtUtil jwtUtil;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
    super(authenticationManager);
    this.jwtUtil = jwtUtil;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain chain
  ) throws IOException, ServletException {
    Authentication authentication = getAuthentication(request);

    if (authentication != null) {
      SecurityContext context = SecurityContextHolder.getContext();
      context.setAuthentication(authentication);
    }
    chain.doFilter(request, response);
  }

  private Authentication getAuthentication(HttpServletRequest request) {
    String token = request.getHeader(AUTHORIZATION);
    //todo: null and expired token handling
    if (token == null) {
      return null;
    }
    Claims claims = jwtUtil.getClaims(token.substring(BEARER.length()));

    if (claims.get("expiredAt", Long.class) < new Date(System.currentTimeMillis()).getTime() / 1000) {

      if (claims.get("userName") == null) {

        throw new ExpiredJwtException(null, null, "need login again.");
      }
      throw new ExpiredJwtException(null, null, "Refresh Token Required.");
    }
    return new UsernamePasswordAuthenticationToken(claims, null);

  }
}


