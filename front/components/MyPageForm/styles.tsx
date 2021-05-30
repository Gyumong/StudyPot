import styled from "@emotion/styled";

export const MypageFormBlock = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StudyList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
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
  border: 1px solid #bdbdbd;
  padding: 0.5rem;
`;

export const StudyName = styled.p`
  color: #4f4f4f;
`;

export const StudyDetail = styled.p`
  color: #828282;
`;
