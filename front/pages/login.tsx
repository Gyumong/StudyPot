import React, { ReactElement } from "react";
import AuthTemplate from "@layouts/auth";
import LoginForm from "@components/LoginForm";

const Login = (): ReactElement => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default Login;
