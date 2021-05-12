import styled from "@emotion/styled";
import Button from "@components/common/Button";


export const MypageFormBlock = styled.form`
  width: 40vw;
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;

  
`;


export const StudyList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3.5rem;
  & > p {
    color: #4f4f4f;
    font-weight: 500;
  }
  & > button {
    color: #4f4f4f;
    all: unset;
    appearance: none;
    cursor: pointer;
  }
`;

export const StudyListBox = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #BDBDBD;
  padding: 0.5rem;
`;

export const StudyName = styled.p`
  color: #4f4f4f;
  
`;

export const StudyDetail = styled.p`
  color: #828282;
`;