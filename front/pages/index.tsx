import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import useMyInfo from "./../hooks/useMyInfo";
export default function Home() {
  const [data, isLoggedIn] = useMyInfo();

  return (
    <>
      <Header />
    </>
  );
}
