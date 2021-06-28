import React, { ReactElement, useEffect } from "react";
import AuthTemplate from "@layouts/auth";
import Header from "@components/Header";
import ProfileEditForm from "@components/ProfileEditForm";
import { useDispatch, useSelector } from "react-redux";
import { loadUserByToken } from "@lib/slices/UserSlice";
const ProfileEdit = (): ReactElement => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, []);
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
