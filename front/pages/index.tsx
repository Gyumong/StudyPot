import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import { useDispatch, useSelector } from "react-redux";
import { loadUserByToken, refreshAccessToken } from "./../lib/slices/UserSlice";
import { RootState } from "@lib/slices";
import * as jwt from "jsonwebtoken";

export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     console.log("토큰");
  //     try {
  //       // 내정보 불러오기 api 호출
  //       dispatch(loadUserByToken(null));
  //     } catch (e) {
  //       // acc토큰 만료
  //       console.log("ref호출");
  //       async () => {
  //         // ref토큰 으로 acc 토큰 재반환 api 호출
  //         await dispatch(refreshAccessToken(null));
  //         // acc 토큰 호출
  //         await dispatch(loadUserByToken(null));
  //       };
  //     }
  //   }
  // }, [dispatch]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
    </>
  );
}
