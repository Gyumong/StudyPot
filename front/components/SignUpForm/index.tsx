import React, { useState, ReactElement, useCallback, useEffect } from "react";
import {
  Header,
  SignUpFormBlock,
  Input,
  SignUpButton,
  Desc,
  Error,
  Success,
  colourStyles,
  SignUpInnerBox,
  SelectBox,
} from "./styles";
import useInput from "@hooks/useInput";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Select, { ValueType } from "react-select";
import { clearState, signUpUser } from "@lib/slices/UserSlice";
import { RootState } from "@lib/slices";
import axios from "axios";
import { backUrl } from "config/config";

type IOptionType = {
  label: string;
  value: number;
  color?: string;
  isFixed?: boolean;
  isDisabled?: boolean;
  key?: string;
};
type IsMulti = true | false;

const colorArray = [
  "#00B8D9",
  "#0052CC",
  "#5243AA",
  "#FF5630",
  "#FF8B00",
  "#FFC400",
  "#36B37E",
  "#00875A",
  "#253858",
  "#666666",
];

const SignUpForm = (): ReactElement => {
  const [email, onChangeEmail] = useInput("");
  const [name, onChangeName] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [mismatchError, setMismatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [defaultValue, setDefaultValue] = useState([] as IOptionType[]);
  const [signUpUserError, setSignUpUserError] = useState("");
  const [FavoriteValue, setFavoriteValue] = useState([] as IOptionType[]);
  const { signUpSuccess, signUpError, errorMessage } = useSelector((state: RootState) => state.users);
  const [allow, setAllow] = useState(true);

  const onChangeFavorite = useCallback(
    (value: ValueType<IOptionType, IsMulti>) => {
      setFavoriteValue(value as IOptionType[]);
      console.log(FavoriteValue);
    },
    [FavoriteValue],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(`${backUrl}/categories`);
        const defaultCategoriesValue = data;
        let index = 0;
        for (const newCategoriesValue of defaultCategoriesValue) {
          newCategoriesValue.color = colorArray[index];
          newCategoriesValue.label = newCategoriesValue.value;
          index++;
        }

        console.log(defaultCategoriesValue);
        setDefaultValue(defaultCategoriesValue);
      } catch (e) {
        console.log("getCategories Error", e);
      }
    }
    getCategories();
  }, []);
  useEffect(() => {
    if ((!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || password.length < 8) && password.length > 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (signUpError) {
      setSignUpUserError(errorMessage ? errorMessage : "회원가입에 실패 했습니다.");
      console.log("로그인 에러");
      console.log(errorMessage);
    }
  }, [signUpSuccess, signUpError, signUpUserError]);
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
      if (!email || !name || !FavoriteValue || !passwordError || !mismatchError) {
        setAllow(false);
      }

      if (!passwordError && !mismatchError && name && FavoriteValue && email && allow) {
        setSignUpUserError("");
        dispatch(
          signUpUser({
            categories: FavoriteValue.map((i) => i.key),
            email: email,
            name: name,
            password: password,
          }),
        );
      }
    },
    [email, name, password, passwordCheck, mismatchError, FavoriteValue, allow],
  );

  // const [userData] = useMyInfo();

  return (
    <SignUpFormBlock onSubmit={onSubmit}>
      <Header>회원가입</Header>

      <SignUpInnerBox>
        <Input type="text" placeholder="이름" value={name} onChange={onChangeName} />
        <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
        <Input
          type="password"
          placeholder="비밀번호(문자,숫자조합 8자 이상)"
          value={password}
          onChange={onChangePassword}
        />
        <Input type="password" placeholder="비밀번호 체크" value={passwordCheck} onChange={onChangePasswordCheck} />

        <SelectBox>
          <Select
            isMulti
            value={FavoriteValue}
            options={defaultValue}
            onChange={onChangeFavorite}
            styles={colourStyles}
            placeholder="관심사"
          />
        </SelectBox>
      </SignUpInnerBox>

      {passwordError && <Error>비밀번호는 문자,숫자조합 8자 이상만 가능합니다.</Error>}
      {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
      {signUpError && <Error>{signUpUserError}</Error>}
      {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
      {!allow && <Error>모든 정보를 입력해주세요</Error>}
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
