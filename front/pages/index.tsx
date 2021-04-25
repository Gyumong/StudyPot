import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [text, setText] = useState<string>("next.js");

  setTimeout(() => {
    setText("typeScript")
  }, 2000)

  return (

    <div className="container">
      <div>
        <span>{text} is working</span>
      </div>
    </div>

  )
}
