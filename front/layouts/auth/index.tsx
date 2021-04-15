import React, { FC } from "react";
import { AuthTemplateBlock, WhiteBox } from "./styles";
const AuthTemplate: FC = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>{children}</WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
