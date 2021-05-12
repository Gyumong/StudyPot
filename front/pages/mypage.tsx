import React, { ReactElement } from "react";
import AuthTemplate from "@layouts/auth";
import Header from "@components/Header";
import MyPageForm from "@components/MyPageForm"

const Mypage = (): ReactElement => {
  return (
    <>
      <Header />
      <AuthTemplate>
        <MyPageForm/>
      </AuthTemplate>
    </>
  );
};

export default Mypage;
