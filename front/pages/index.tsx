import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import useMyInfo from "./../hooks/useMyInfo";
export default function Home() {
  const [data, isLoggedIn] = useMyInfo();
  console.log(data, isLoggedIn);
  return <>{data ? <Header isLoggedIn={isLoggedIn} /> : <Header />}</>;
}
