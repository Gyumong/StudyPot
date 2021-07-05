import { css } from "@emotion/react";

export const globalStyles = css`
  html,
  body {
    margin: 0;
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: border-box;
    overflow-x : hidden;
  }

  ::selection {
    background: #26DE81;
    color: #fff;
 }

  a {
    text-decoration: none;
    color: inherit;
  }
  :focus {
    outline: none;
    border: none;
  }
  button {
    outline: none;
    border: none;
  }
  ol,
  ul,
  li {
    list-style: none;
  }

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;
