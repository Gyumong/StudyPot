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
  max-width: 800px;
  font-size: 1rem;
  margin-top: 2rem;
  background: #26de81;
  border-radius: 6px;
  padding: 1.5rem 0;
  color: white;
  line-height: 1;
  font-weight: 600;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #70e0a8;
  }
  cursor: pointer;
  transition: 0.125s all ease-in;
  &:focus {
    box-shadow: 0px 2px 12px #00000030;
  }
`;

const Button: FC<Props> = (props) => <StyledButton {...props} />;

export default Button;
