import React, { ReactElement } from "react";
import AuthTemplate from "@layouts/auth";
import SignUpForm from "@components/SignUpForm";
const SignUp = (): ReactElement => {
  return (
    <AuthTemplate>
      <SignUpForm />
    </AuthTemplate>
  );
};

export default SignUp;
