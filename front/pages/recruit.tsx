import React, { ReactElement } from "react";
import AuthTemplate from "@layouts/auth";
import RecruitForm from "@components/RecruitForm";
import { useDispatch, useSelector } from "react-redux";

const Recruit = (): ReactElement => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, [dispatch]);
  return (
    <AuthTemplate>
      <RecruitForm />
    </AuthTemplate>
  );
};

export default Recruit;
