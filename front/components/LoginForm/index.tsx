import React, { useCallback, useEffect } from "react";
import useInput from "@hooks/useInput";
import { LoginFormBlock, Header, LoginButton, Input, Desc, Error } from "./styles";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearState, loginUser } from "@lib/slices/UserSlice";
import { useRouter } from "next/router";
import { RootState } from "@lib/store/configureStore";
import Modal from "@components/common/Modal";

const LoginForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, , setPassword] = useInput("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { isSuccess, isError } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        loginUser({
          email,
          password,
        }),
      );
    },
    [email, password],
  );
  return (
    <LoginFormBlock onSubmit={onSubmit}>
      <Header>로그인</Header>
      <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
      <Input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
      {isError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
      <LoginButton>로그인</LoginButton>
      <Desc>
        StudyPot 계정이 없으세요?&nbsp;
        <Link href={{ pathname: "/signup" }}>
          <a>회원 가입</a>
        </Link>
      </Desc>
      <Modal />
    </LoginFormBlock>
  );
};

export default LoginForm;
