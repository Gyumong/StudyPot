import React, { ReactElement } from "react";
import { Header, SignUpFormBlock, Input, SignUpButton } from "./styles";

const SignUpForm = (): ReactElement => {
  return (
    <SignUpFormBlock>
      <Header>회원가입</Header>
      <Input placeholder="이름" />
      <Input placeholder="이메일" />
      <Input placeholder="비밀번호(문자,숫자조합 8자 이상)" />
      {/* <Desc></Desc> */}
      <SignUpButton>계정 만들기</SignUpButton>
      {/* <Footer></Footer> */}
    </SignUpFormBlock>
  );
};

export default SignUpForm;
