import React, { ReactElement, useEffect } from "react";
import AuthTemplate from "@layouts/auth";
import Header from "@components/Header";
import ProfileEditForm from "@components/ProfileEditForm";
import { useDispatch, useSelector } from "react-redux";
import { clearState, loadUserByToken } from "@lib/slices/UserSlice";
import { RootState } from "@lib/slices";
import { useRouter } from "next/router";
const ProfileEdit = (): ReactElement => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
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
        <ProfileEditForm />
      </AuthTemplate>
    </>
  );
};

export default ProfileEdit;
