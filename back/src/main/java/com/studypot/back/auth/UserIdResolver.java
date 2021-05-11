package com.studypot.back.auth;

import static com.studypot.back.constants.AuthConstant.AUTH_USER_ID;

import com.studypot.back.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class UserIdResolver extends AuthResolver {

  public UserIdResolver(JwtUtil jwtUtil) {
    super(jwtUtil);
  }

  @Override
  public boolean supportsParameter(MethodParameter parameter) {
    return Long.class.equals(parameter.getParameterType());
  }

  @Override
  public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest,
      WebDataBinderFactory binderFactory) throws Exception {
    Authentication authentication = getAuthentication(webRequest);

    if (authentication == null) {
      throw new RuntimeException("token is null");
    }

    Claims claims = (Claims) authentication.getPrincipal();
    return claims.get(AUTH_USER_ID, Long.class);

  }
}
