import styled from "@emotion/styled";
import Button from "../common/Button";

interface Props {
  name?: string;
  className?: string;
  onClick?: (e: Event) => void;
}
export const MainFrame = styled.div`
  display: flex;
  position: fixed;
  z-index: 30;
  width: 100vw;
  top: 0;
  left: 0;
  height: 5rem;
  background-color: white;
  border-bottom: 1px solid #eeefee;
`;

export const Logo = styled.a`
  position: relative;
  top: 1rem;
  left: 5%;
  text-decoration: none;
  cursor: pointer;
`;

export const MenuFrame = styled.ul`
  display: flex;
  position: absolute;
  top: 0.5rem;
  left: 40%;
  color: #4f4f4f;
`;

export const MenuItem = styled.li`
  font-size: 1rem;
  padding-top: 1rem;
  float: left;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #26de81;
  }
  & + & {
    margin-left: 2rem;
  }
`;

export const ButtonFrame = styled.div`
  position: absolute;
  top: 0;
  left: 74%;
`;

export const RegisterButton = styled(Button)`
  position: relative;
  width: 8rem;
  height: 2rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

export const LoginButton = styled(Button)<Props>`
  position: relative;
  width: 8rem;
  height: 2rem;
  margin-top: 1rem;
  background-color: #ffffff;
  border: 2px solid #26de81;
  color: #26de81;
  &:hover {
    background: #70e0a8;
    color: #ffffff;
  }
`;
