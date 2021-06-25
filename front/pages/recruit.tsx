import React, { ReactElement } from "react";
import AuthTemplate from "@layouts/auth";
import RecruitForm from "@components/RecruitForm"



const Recruit = (): ReactElement => {
  return (
    <AuthTemplate>
      <RecruitForm/>
    </AuthTemplate>
  );
};

export default Recruit;
