import styled from "@emotion/styled";

export const StudyCardContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  justify-content: space-between;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: auto;
  background: #f2f2f2;
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 8rem;


  ${props => props.theme.mq.mobileL} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    }
   
    ${props => props.theme.mq.laptop} {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    
`;
