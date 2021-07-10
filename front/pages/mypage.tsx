import React, { ReactElement, useEffect } from "react";
import AuthTemplate from "@layouts/auth";
import Header from "@components/Header";
import MyPageForm from "@components/MyPageForm";
import { useDispatch, useSelector } from "react-redux";
import { clearState, loadUserByToken } from "@lib/slices/UserSlice";
import { RootState } from "@lib/store/configureStore";
import { useRouter } from "next/router";
const Mypage = (): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    dispatch(loadUserByToken(null));
    if (!isLoggedIn) {
      router.push("/");
    }
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, isLoggedIn]);

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
