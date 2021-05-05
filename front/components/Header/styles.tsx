import styled from "@emotion/styled";
import palette from "@styles/palette";
import Button from "../common/Button";


export const MainFrame = styled.div`
  display: flex;
  width: 100%;
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
    float: left;
    cursor: pointer;
        &:hover {
            text-decoration:underline;
            color: #26de81;
        } 
        & + & {
        margin-left: 1rem;
        }
`

export const ButtonFrame = styled.div`
  position: absolute;
  top: 0;
  left: 75%;
`;

export const RegisterButton = styled(Button)`
  position: relative;
  width: 130px;
  height: 15px;
  margin-left: 1rem;
  margin-top: 1rem;
`;

export const LoginButton = styled(Button)`
  position: relative;
  width: 130px;
  height: 15px;
  margin-top: 1rem;
  background-color: #ffffff;
  border: 1px solid #26de81;
  color: #26de81;
  &:hover {
    background: #70e0a8;
    color: #ffffff;
  }
`;
