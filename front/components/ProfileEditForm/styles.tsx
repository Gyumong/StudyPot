import styled from "@emotion/styled";
import Button from "@components/common/Button";


export const ProfileEditBlock = styled.div`
  width: 40vw;
  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const ProfileSubmitForm = styled.form`
  width: 100%;
  margin-left: 2rem;
  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  
`;

export const Setting = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0;
`;

export const UserName = styled.p`
  margin-top: 0;
`;

export const Location = styled.div`
  display: flex;
  flex-direction: low;
  & > p {
  font-size: 1rem;
  color: #bdbdbd;
  margin-top:0;
}
  
`;

export const Interest = styled.div`
display: flex;
flex-direction: low;
  & > p {
    font-size: 1rem;
    color: #bdbdbd;
    margin-top:0;
  }
`;


export const SelfIntro = styled.p`
  color: #4F4F4F;
`;

export const EditButton = styled(Button)`
  margin-top: 1rem;
  width: 8rem;
  height: 2rem;
`;

export const AccountSettingBlock = styled.div`
  
`;

export const AccountSetting= styled.div`
  width: 100%;
  margin-left: 2rem;
  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  

  
  
`;


export const ChangePassword = styled.div`

  & > button {
    color: #4f4f4f;
    all: unset;
    appearance: none;
    cursor: pointer;
    border-bottom: 1px solid black; 
  }
`;

export const DeletedAccount = styled.div`
  

  & > button {
 
  color: #4f4f4f;
  all: unset;
  appearance: none;
  cursor: pointer;
  border-bottom: 1px solid black; 
}
`;