import styled from "@emotion/styled";
import Button from "../common/Button";


export const Frame = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 2.5rem;
background-color: #f2f2f2;

& > h1 {
    
    font-size: 1.875rem;
}

${props => props.theme.mq.mobileL} {
  width: 100%;
height: 600px;
}

${props => props.theme.mq.laptop} {
  width: 100rem;
height: 1500px;
}
`;

export const GridBox = styled.div`
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
margin-top: 2rem;
`;

export const MoreButton = styled(Button)`
 
  width: 10rem;
  height: 3rem;
  margin-top: 1rem;
  background-color: #ffffff;
  border: 2px solid #26de81;
  color: #26de81;
  font-size: 1rem;
  line-height: 2rem;


 
`;