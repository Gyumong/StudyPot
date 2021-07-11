import React, { ReactElement, useEffect } from "react";
import AuthTemplate from "@layouts/auth";
import RecruitForm from "@components/RecruitForm";
import { useDispatch, useSelector } from "react-redux";
import { loadUserByToken } from "@lib/slices/UserSlice";
import { RootState } from "@lib/store/configureStore";
import { useRouter } from "next/router";

const Recruit = (): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    dispatch(loadUserByToken(null));
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [dispatch, isLoggedIn]);

  return (
    <AuthTemplate>
      <RecruitForm />
    </AuthTemplate>
  );
};

export default Recruit;
