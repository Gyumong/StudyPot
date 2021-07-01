import React, { useCallback, useState, useEffect, ReactElement, EffectCallback } from "react";
import useInput from "@hooks/useInput";
import { LoginFormBlock, Header, LoginButton, Input, Desc, Error } from "./styles";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearState, loginUser } from "@lib/slices/UserSlice";
import { push } from "connected-next-router";
import { useRouter } from "next/router";
import { RootState } from "@lib/slices";
import Modal from "@components/common/Modal";
import { clearModal, popModal } from "@lib/slices/ModalSlice";
const LoginForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, , setPassword] = useInput("");
  const [logInError, setLogInError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSuccess, isError, loadUserError } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    return () => {
      dispatch(clearState());
      dispatch(clearModal());
    };
  }, []);

  useEffect(() => {
    async function LoginSuccess() {
      await dispatch(clearState());
      await dispatch(
        popModal({
          title: "로그인 성공하였습니다",
        }),
      );
      setTimeout(() => {
        dispatch(clearModal());
        router.push("/");
      }, 3000);
    }

    async function LoginFail() {
      await dispatch(clearState());
      await dispatch(
        popModal({
          title: "로그인 실패하였습니다",
        }),
      );
      setTimeout(() => {
        dispatch(clearModal());
      }, 3000);
    }
    if (isError) {
      LoginFail();
    }

    if (isSuccess) {
      LoginSuccess();
    }
  }, [isSuccess, isError]);

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
      {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
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
