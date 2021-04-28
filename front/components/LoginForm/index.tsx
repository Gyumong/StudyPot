import React, { ReactElement, useCallback } from "react";
import useInput from "@hooks/useInput";
import { LoginFormBlock, Header, LoginButton, Input, Desc } from "./styles";
import Link from "next/link";
const LoginForm = (): ReactElement => {
  const [email, onChangeEmail] = useInput("");
  const [password, , setPassword] = useInput("");

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, password);
    },
    [email, password],
  );

  return (
    <LoginFormBlock onSubmit={onSubmit}>
      <Header>로그인</Header>
      <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
      <Input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
      <LoginButton>로그인</LoginButton>
      <Desc>
        StudyPot 계정이 없으세요?&nbsp;
        <Link href={{ pathname: "/signup" }}>
          <a>회원 가입</a>
        </Link>
      </Desc>
    </LoginFormBlock>
  );
};

export default LoginForm;
