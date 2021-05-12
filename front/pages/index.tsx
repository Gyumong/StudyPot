import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import useMyInfo from "./../hooks/useMyInfo";
export default function Home() {
  const [data, error] = useMyInfo();
  console.log(data);
  return (
    <>
      <Header />
    </>
  );
}
