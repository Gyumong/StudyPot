import React, { ReactElement, useCallback, useState } from "react";
import useInput from "@hooks/useInput";
import { LoginFormBlock, Header, LoginButton, Input, Desc, Error } from "./styles";
import Link from "next/link";
import axios from "axios";
const LoginForm = (): ReactElement => {
  const [email, onChangeEmail] = useInput("");
  const [password, , setPassword] = useInput("");

  const [logInError, setLogInError] = useState(false);
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          "/signin",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          console.log("?");
        })
        .catch((error) => {
          setLogInError(error.response);
        });
    },
    [email, password],
  );

  return (
    <LoginFormBlock onSubmit={onSubmit}>
      <Header>로그인</Header>
      <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
      <Input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
      {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
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
