package com.studypot.back.filters;

import static com.studypot.back.constants.AuthConstant.AUTHORIZATION;
import static com.studypot.back.constants.AuthConstant.BEARER;
import static com.studypot.back.constants.AuthConstant.REFRESH_TOKEN;

import com.studypot.back.exceptions.RequiredLoginAgainException;
import com.studypot.back.exceptions.RequiredRefreshTokenException;
import com.studypot.back.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;
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
    if (token == null) {
      return null;
    }
    try {

      Claims claims = jwtUtil.getClaims(token.substring(BEARER.length()));

      return new UsernamePasswordAuthenticationToken(claims, null);

    } catch (ExpiredJwtException e) {

      String refreshToken = request.getHeader(REFRESH_TOKEN);

      if (refreshToken == null) {

        throw new RequiredRefreshTokenException("refresh token required.");

      }
      try {

        Claims claims = jwtUtil.getClaims(refreshToken);

        return new UsernamePasswordAuthenticationToken(claims, null);

      } catch (ExpiredJwtException ex) {

        throw new RequiredLoginAgainException("need login again.");

      }
    }
  }
}
