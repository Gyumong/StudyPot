import React, { FC } from "react";
import { AuthTemplateBlock, WhiteBox } from "./styles";
import Header from "@components/Header";

const AuthTemplate: FC = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <Header/>
      <WhiteBox>
        {children}
        </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
