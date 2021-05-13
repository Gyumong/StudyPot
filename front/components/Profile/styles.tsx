import styled from "@emotion/styled";
import Button from "@components/common/Button";


export const ProfileFormBlock = styled.div`
  width: 40vw;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  
  
`;

export const UserName = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 0;
`;

export const Location = styled.div`
  display: flex;
  flex-direction: low;
  & > p {
  color: #bdbdbd;
  margin-top:0;
}
  
`;

export const Interest = styled.div`
display: flex;
flex-direction: low;
  & > p {
    color: #bdbdbd;
    margin-top:0;
  }
`;


export const SelfIntro = styled.p`
  color: #4F4F4F;
`;

export const ProfileEditButton = styled(Button)`
  margin-top: 1rem;
  width: 8rem;
  height: 2rem;
`;
