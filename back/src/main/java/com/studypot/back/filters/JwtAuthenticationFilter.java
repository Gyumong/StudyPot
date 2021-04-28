package com.studypot.back.filters;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import com.studypot.back.utils.JwtUtil;
import io.jsonwebtoken.Claims;
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

    Claims claims = jwtUtil.getClaims(token.substring("Bearer ".length()));

    Authentication authentication = new UsernamePasswordAuthenticationToken(claims, null);
    return authentication;
  }
}
