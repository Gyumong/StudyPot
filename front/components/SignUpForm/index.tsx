import React, { useState, ReactElement, useCallback, useEffect } from "react";
import { Header, SignUpFormBlock, Input, SignUpButton, Desc, Error, Success } from "./styles";
import useInput from "@hooks/useInput";
import Link from "next/link";
import axios from "axios";

const SignUpForm = (): ReactElement => {
  const [email, onChangeEmail] = useInput("");
  const [name, onChangeName] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [mismatchError, setMismatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  useEffect(() => {
    if ((!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || password.length < 8) && password.length > 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      if (password) {
        setMismatchError(e.target.value !== password);
      }
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!passwordError && !mismatchError && name) {
        setSignUpError("");
        setSignUpSuccess(false);
        axios
          .post(`/signup`, {
            email,
            name,
            password,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error.response);
            setSignUpError(error.response.data);
          });
      }
    },
    [email, name, password, passwordCheck, mismatchError],
  );

  return (
    <SignUpFormBlock onSubmit={onSubmit}>
      <Header>회원가입</Header>
      <Input type="text" placeholder="이름" value={name} onChange={onChangeName} />
      <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
      <Input
        type="password"
        placeholder="비밀번호(문자,숫자조합 8자 이상)"
        value={password}
        onChange={onChangePassword}
      />
      <Input type="password" placeholder="비밀번호 체크" value={passwordCheck} onChange={onChangePasswordCheck} />
      {passwordError && <Error>비밀번호는 문자,숫자조합 8자 이상만 가능합니다.</Error>}
      {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
      {signUpError && <Error>{signUpError}</Error>}
      {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
      <Desc>
        계정 만들기 버튼을 클릭하면, <strong>스터디팟</strong> 의 <u>회원약관</u>에 동의하며 <br />
        쿠키 사용을 포함한 <u>개인정보처리방침</u>을 읽었음을 인정하게 됩니다.
      </Desc>
      <SignUpButton>계정 만들기</SignUpButton>
      <Desc style={{ marginTop: "1rem" }}>
        이미 가입하셨다면?&nbsp;
        <Link href={{ pathname: "/login" }}>
          <a>로그인</a>
        </Link>
      </Desc>
      {/* <Footer></Footer> */}
    </SignUpFormBlock>
  );
};

export default SignUpForm;
