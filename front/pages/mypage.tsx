import React, { ReactElement, useEffect } from "react";
import AuthTemplate from "@layouts/auth";
import Header from "@components/Header";
import MyPageForm from "@components/MyPageForm";
import { useDispatch, useSelector } from "react-redux";
import { clearState, loadUserByToken } from "@lib/slices/UserSlice";
import { RootState } from "@lib/slices";
const Mypage = (): ReactElement => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserByToken(null));
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);
  return (
    <>
      <Header />
      <AuthTemplate>
        <MyPageForm />
      </AuthTemplate>
    </>
  );
};

export default Mypage;
