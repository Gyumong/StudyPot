import React, { useState } from "react";
import Header from "@components/Header";

export default function Home() {
  const [text, setText] = useState<string>("next.js");

  setTimeout(() => {
    setText("typeScript");
  }, 2000);

  return (
    <div className="container">
      <Header />
      <div>
        <span>{text} is working</span>
      </div>
    </div>
  );
}
