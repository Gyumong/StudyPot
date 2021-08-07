import styled from "@emotion/styled";
import Button from "../common/Button";



export const Frame = styled.div`
display: flex;
align-items: center;
width: 100%;
height: 300px;
padding: 5rem;
background-color: #ffffff;

${props => props.theme.mq.mobileL} {
  justify-content: space-around;
  flex-direction: column;
  height: 250px;
  padding: 2.5rem;
  
}

${props => props.theme.mq.laptop} {
  display: flex;
  flex-direction: row;
  align-items: center;
 height: 300px;
 padding: 5rem;
}

`;

export const FrameCopy = styled.div`

display: flex;
justify-content: center;
  
${props => props.theme.mq.mobileL} {
  
  width: 22.5rem;
  font-size: 1.25rem;
}

${props => props.theme.mq.laptop} {
  width: 30rem;
 font-size: 1.875rem;
}

`;

export const ButtonBox = styled.div`
  width: 22.5rem;
  display: flex;
  justify-content: space-between;


${props => props.theme.mq.mobileL} {
  justify-content: space-around;
  
}

${props => props.theme.mq.laptop} {
  margin-left: 0rem;
  flex-direction:row;
}
`;


export const RegisterButton = styled(Button)`
  width: 10rem;
  height: 3rem;

${props => props.theme.mq.mobileL} {
  width: 8rem;
  height: 3rem;
}
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
    width: 8rem;
    height: 3rem;
  }

${props => props.theme.mq.laptop} {
  margin-top: 0rem;
 
}
`;
