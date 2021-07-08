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

${props => props.theme.mq.mobileL} {
  
  height: 150px;
  padding: 2.5rem;
  
}

${props => props.theme.mq.laptop} {

 height: 300px;
 padding: 5rem;
}

`;

export const FrameCopy = styled.div`

${props => props.theme.mq.mobileL} {
  
  font-size: 1.125rem;
}

${props => props.theme.mq.laptop} {
 font-size: 1.875rem;
}

`;

export const ButtonBox = styled.div`
  width: 22.5rem;
  display: flex;
  justify-content: space-between;


${props => props.theme.mq.mobileL} {
  margin-left: 5rem;
  flex-direction:column;
  
}

${props => props.theme.mq.laptop} {
  margin-left: 0rem;
  flex-direction:row;
}
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


${props => props.theme.mq.mobileL} {
  margin-top: 1.5rem;
  
}

${props => props.theme.mq.laptop} {
  margin-top: 0rem;
}
`;
