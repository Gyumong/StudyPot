import styled from "@emotion/styled";
import Button from "../common/Button";



export const Frame = styled.div`
  display: flex;
  position: relative;
  z-index: 20;
  width: 100vw;
  max-height: 1000px;
  margin-top: 5rem;
  left: 0;
  height: 100vh;
  background-color: #fffff;
`;

export const CopyButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
  margin-left: 10rem;
 
`;

export const CopyBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 45vw;
  height: 20vh;
`;

export const MainCopy = styled.p`
font-size: 2.25rem;
line-height: 3.5rem;
  & > span {
      font-weight: 600;
  }
`;

export const SubCopy = styled.p`
display: flex;
flex-direction: column;
font-size: 1.125rem;
line-height: 1.75rem;
margin-top: 1.5rem;

  & > span  {
      margin-bottom: 0.625rem;
  }
`;

export const ButtonBox = styled.div`
margin-top: 5.5rem;
`;

export const ServiceButton = styled(Button)`
 
  width: 10rem;
  height: 3rem;
  margin-top: 1rem;
  background-color: #ffffff;
  border: 2px solid #26de81;
  color: #26de81;
 
`;

export const MakeButton = styled(Button)`
 
  width: 10rem;
  height: 3rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;
