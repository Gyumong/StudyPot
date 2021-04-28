package com.studypot.back;

import com.studypot.back.filters.JwtAuthenticationFilter;
import com.studypot.back.utils.JwtUtil;
import javax.servlet.Filter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebConfigurerImpl extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    Filter filter = new JwtAuthenticationFilter(authenticationManager(), new JwtUtil(secretKey));
    http
        .csrf().disable()
        .cors().disable()
        .formLogin().disable()
        .headers().frameOptions().disable()
        .and()
        .addFilter(filter)
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Value("${jwt.secret}")
  private String secretKey;

  @Bean
  public PasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

}