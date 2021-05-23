package com.studypot.back.swagger;

import com.studypot.back.auth.UserName;
import com.studypot.back.constants.AuthConstant;
import java.util.Optional;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import springfox.documentation.schema.ScalarType;
import springfox.documentation.service.ParameterType;
import springfox.documentation.service.ResolvedMethodParameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.ParameterBuilderPlugin;
import springfox.documentation.spi.service.contexts.ParameterContext;
import springfox.documentation.swagger.common.SwaggerPluginSupport;

@Component
@Order(SwaggerPluginSupport.SWAGGER_PLUGIN_ORDER)
public class SwaggerPlugin implements ParameterBuilderPlugin {


  @Override
  public void apply(ParameterContext parameterContext) {
    ResolvedMethodParameter parameter = parameterContext.resolvedMethodParameter();
    Optional<UserName> annotation = parameter.findAnnotation(UserName.class);

    if (annotation.isPresent()) {
      parameterContext
          .requestParameterBuilder()
          .in(ParameterType.HEADER)
          .name(AuthConstant.AUTHORIZATION)
          .description("Bearer access token")
          .required(true)
          .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)));
    }

  }

  @Override
  public boolean supports(DocumentationType delimiter) {
    return true;
  }
}
