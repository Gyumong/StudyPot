import styled from "@emotion/styled";
import Button from "../common/Button";



export const Frame = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 300px;
padding: 5rem;
background-color: #ffffff;

& > h1 {
    font-weight: 300;
    font-size: 1.875rem;
}
`;

export const ButtonBox = styled.div`
  width: 22.5rem;
  display: flex;
  justify-content: space-between;

`;


export const RegisterButton = styled(Button)`
  width: 10rem;
  height: 3rem;
`;


export const LoginButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  background-color: #ffffff;
  border: 2px solid #26de81;
  color: #26de81;
  &:hover {
    background: #70e0a8;
    color: #ffffff;
  }
`;
