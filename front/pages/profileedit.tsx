import React, { ReactElement } from "react";
import AuthTemplate from "@layouts/auth";
import Header from "@components/Header";
import ProfileEditForm from "@components/ProfileEditForm"

const ProfileEdit = (): ReactElement => {
  return (
    <>
      <Header />
      <AuthTemplate>
        <ProfileEditForm/>
      </AuthTemplate>
    </>
  );
};

export default ProfileEdit;
