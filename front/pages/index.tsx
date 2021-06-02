import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import useMyInfo from "./../hooks/useMyInfo";
import { useDispatch, useSelector } from "react-redux";
import { loadUserByToken } from "./../lib/slices/UserSlice";
import { RootState } from "@lib/slices";
export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.users);
  // const [data, isLoggedIn] = useMyInfo();
  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, []);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
    </>
  );
}
