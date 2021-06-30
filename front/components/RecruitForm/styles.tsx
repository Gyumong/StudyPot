import styled from "@emotion/styled";
import Button from "@components/common/Button";
import { Form } from "antd";

export const ProfileEditBlock = styled.div`
  width: 50vw;
  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const Setting = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0;
`;

export const RecruitSubmitForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 2rem;

  position: relative;
`;

export const  ImageUploader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0
  margin-bottom: 0;
  height: 10rem;

  width: 115%;
  text-align: center;
  background: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.3s;

  & > input {
    margin-left: 10rem;
    width: 15rem;
    text-align: center;
  }

  &:hover {
    border-color: #70e0a8;
  }

`;


export const StudyName = styled.p`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 0;
  height: 3rem;

  & > span {
    width: 4rem;
    margin-right: 3rem;
  }
`;

export const CategoryFormBlock = styled.div`
  display: flex;
  margin-top: 2rem;
  height: 3rem;
`;

export const CategoryList = styled.div`
width: 4rem;
margin-bottom: 1rem;
margin-right: 3rem;
`;

export const Location = styled.div`
  display: flex;
  margin-top: 2rem;
  height: 3rem;
`;

export const HeadCount = styled.div`
  display: flex;
  margin-top: 2rem;
  height: 3rem;
`;

export const Type = styled.div`
  display: flex;
  margin-top: 2rem;
  height: 3rem;
`;

export const State = styled.div`
  display: flex;
  margin-top: 2rem;
  height: 3rem;
`;

export const Description = styled.p`
  color: #4f4f4f;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const RecruitFormList = styled.div`
  width: 4rem;
  margin-bottom: 1rem;
  margin-right: 3rem;
`;

export const EditButton = styled(Button)`
  margin-top: 1rem;
  width: 8rem;
  height: 2rem;
`;

export const AccountSettingBlock = styled.div``;

export const AccountSetting = styled.div`
  width: 100%;
  margin-left: 2rem;
  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const ChangePassword = styled.div`
  display: flex;

  & > p {
    width: 6rem;
    margin-right: 2rem;
  }
`;

export const DeletedAccount = styled.div`
  display: flex;

  & > p {
    width: 6rem;
    margin-right: 2rem;
  }
`;

export const AccountSettingButton = styled.p`
  cursor: pointer;
  border-bottom: 1px solid #4f4f4f;
`;

export const RecruitFormBlock = styled.main`
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

export const StudyDetail = styled.p`
  color: #828282;
`;
