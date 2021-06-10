import React, { ReactElement } from "react";
import Header from "@components/Header";
import FindStudy from "@components/FindStudy";

const find = (): ReactElement => {
  return (
    <>
      <Header/>
      <FindStudy/>
    </>
  );
};

export default find;
