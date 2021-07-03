import React, { useEffect } from "react";
import Header from "@components/Header";
import Main from "@components/Main";
import HotStudy from "@components/HotStudy";
import MainJoinBox from "@components/MainJoinBox";
import Footer from "@components/Footer";

import { useDispatch } from "react-redux";
import { clearState, loadUserByToken } from "@lib/slices/UserSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserByToken(null));
    return () => {
      dispatch(clearState());
    };
  }, []);
  return (
    <>
      <Header />
      <Main />
      <HotStudy />
      <MainJoinBox />
      <Footer />
    </>
  );
}
