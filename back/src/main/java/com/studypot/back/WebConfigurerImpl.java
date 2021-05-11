package com.studypot.back;

import com.studypot.back.auth.UserIdResolver;
import com.studypot.back.auth.UserNameResolver;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebConfigurerImpl extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

  //todo: projection 수정하기
  private final UserNameResolver userNameResolver;
  private final UserIdResolver userIdResolver;

  public WebConfigurerImpl(UserNameResolver userNameResolver, UserIdResolver userIdResolver) {
    this.userNameResolver = userNameResolver;
    this.userIdResolver = userIdResolver;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("*");

  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .csrf().disable()
        .cors().disable()
        .formLogin().disable()
        .headers().frameOptions().disable()
        .and()
        .authorizeRequests()
        .antMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources")
        .permitAll()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Override
  public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
    resolvers.add(userNameResolver);
    resolvers.add(userIdResolver);
  }

  @Bean
  public PasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
