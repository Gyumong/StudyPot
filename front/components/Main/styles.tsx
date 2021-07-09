import styled from "@emotion/styled";
import Button from "../common/Button";

import Image from "next/image";

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

  ${props => props.theme.mq.mobileL} {
    max-height: 350px;
  }
  ${props => props.theme.mq.tablet} {
    max-height: 1000px;
  }
  ${props => props.theme.mq.laptop} {
    
  }


`;

export const CopyButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
 
  ${props => props.theme.mq.mobileL} {
    margin-top: 2.5rem;
  margin-left: 2.5rem;
  }
  ${props => props.theme.mq.tablet} {
    margin-top: 5rem;
  margin-left: 5rem;
  }
  ${props => props.theme.mq.laptop} {
    margin-top: 10rem;
  }
`;

export const CopyBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 45vw;
  height: 20vh;


  ${props => props.theme.mq.mobileL} {
    width: 80vw;
    height: 20vh;
  }
  ${props => props.theme.mq.tablet} {
    width: 80vw;
  height: 20vh;
  }
  ${props => props.theme.mq.laptop} {
    width: 45vw;
  height: 20vh;
  }
  }
`;

export const MainCopy = styled.p`
font-size: 2.25rem;
line-height: 3.5rem;
  & > span {
      font-weight: 600;
  }

  ${props => props.theme.mq.mobileL} {
    font-size: 1.25rem;
    line-height: 2.5rem;
  }
  ${props => props.theme.mq.tablet} {
    font-size: 2rem;
  }
  ${props => props.theme.mq.laptop} {
    font-size: 2.25rem;
  line-height: 3.5rem;
  & > span {
      font-weight: 600;
  }
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


${props => props.theme.mq.mobileL} {
  margin-top: 3rem;
}
${props => props.theme.mq.tablet} {
  margin-top: 5rem;
}
${props => props.theme.mq.laptop} {
  margin-top: 5.5rem;
}

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


export const MainImage = styled(Image)`

${props => props.theme.mq.mobileL} {
  visibility:hidden;
}
${props => props.theme.mq.tablet} {
  visibility:hidden;
}
${props => props.theme.mq.laptop} {
  visibility: visible;
}

`;
