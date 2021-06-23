import React, { useCallback } from "react";
import Link from "next/link";
import { MainFrame, Logo, MenuFrame, MenuItem, ButtonFrame, RegisterButton, LoginButton } from "./styles";
import Image from "next/image";

import { logOut } from "@lib/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@lib/slices";

import { mutate } from "swr";


const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.users);
  // const [userData] = useMyInfo();
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logOut());
  }, [isLoggedIn]);
  if (isLoggedIn) {
    return (
      <MainFrame>
        <Link href="/">
          <Logo>
            <Image src="/logo_621x206.png" alt="logo" width={120} height={40} />
          </Logo>
        </Link>

        <MenuFrame>
          <MenuItem>
            <Link href="/find">스터디찾기</Link>
          </MenuItem>

          <MenuItem>
            <Link href="/recruit">스터디모집</Link>
          </MenuItem>
        </MenuFrame>
        <ButtonFrame>
          <>
            <LoginButton onClick={onLogOut}>로그아웃</LoginButton>
          </>
          <Link href="/mypage">
            <RegisterButton>마이페이지</RegisterButton>
          </Link>
        </ButtonFrame>
      </MainFrame>
    );
  }
  return (
    <MainFrame>
      <Link href="/">
        <Logo>
          <Image src="/logo_621x206.png" alt="logo" width={120} height={40} />
        </Logo>
      </Link>
      <MenuFrame>
        <MenuItem>
          <Link href="/find">스터디찾기</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/recruit">스터디모집</Link>
        </MenuItem>
      </MenuFrame>

      <ButtonFrame>
        <Link href="/login">
          <LoginButton>로그인</LoginButton>
        </Link>

        <Link href="/signup">
          <RegisterButton>회원가입</RegisterButton>
        </Link>
      </ButtonFrame>
    </MainFrame>
  );
};

export default Header;
