import styled from "@emotion/styled";
import Button from "../common/Button";


export const Frame = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
height: 1500px;
padding: 2.5rem;
background-color: #f2f2f2;

& > h1 {
    
    font-size: 1.875rem;
}
`;

export const GridBox = styled.div`
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
margin-top: 2rem;
`;

export const MoreButton = styled(Button)`
 
  width: 11rem;
  height: 4rem;
  margin-top: 1rem;
  background-color: #ffffff;
  border: 2px solid #26de81;
  color: #26de81;
  font-size: 1.125rem;
  line-height: 2rem;
  font-weight: 500;
 
`;