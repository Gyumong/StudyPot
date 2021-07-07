import React, { FC } from "react";
import styled from "@emotion/styled";

interface A {
  a?: string;
}

interface B<P> {
  b?: P;
}

interface Props extends A, B<string> {}

const StyledButton = styled.button`
  width: 100%;
  max-width: 500px;
  font-size: 1rem;
  background-color: #26de81;
  border-radius: 6px;
  padding: 1.25rem 0;
  color: white;
  line-height: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #70e0a8;
    color: #ffffff;

    --tw-bg-opacity: 1;
    background-color: rgba(95, 228, 161, var(--tw-bg-opacity));
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  cursor: pointer;
  transition: 0.125s all ease-in;
  &:focus {
    outline: none;
    box-shadow: 0px 2px 12px #00000030;
  }
`;

const Button: FC<Props> = (props) => <StyledButton {...props} />;

export default Button;
