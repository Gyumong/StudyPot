import styled from "@emotion/styled";
import Button from "@components/common/Button";
import { Form } from "antd";
interface Props {
  onClick?: (e: Event) => void;
}

export const colors = [
  "#00B8D9",
  "#0052CC",
  "#5243AA",
  "#FF5630",
  "#FF8B00",
  "#FFC400",
  "#36B37E",
  "#00875A",
  "#253858",
  "#666666",
];
export const CInput = styled.input`
  width: 90%;
  margin-top: 5rem;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.5rem;
  & + & {
    margin-top: 2rem;
  }
  ::-webkit-input-placeholder {
    color: #adb5bd;
  }
`;
export const ProfileEditBlock = styled.div`
  width: 50vw;
  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;


  ${props => props.theme.mq.mobileL} {
    padding-left: 4vw;
    padding-right: 4vw;
    width: 90vw;
    }
   
    ${props => props.theme.mq.laptop} {
     
      padding-left: 0;
    padding-right: 0;
      width: 50vw;
    }


`;

export const ProfileSubmitForm = styled.form`
  width: 100%;
  margin-bottom: 2rem;
  padding: 0;
`;

export const Setting = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0;



  ${props => props.theme.mq.mobileL} {
    margin-top: 1rem;
    }
   
    ${props => props.theme.mq.laptop} {
      margin-top: 0;
    }
  
`;

export const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  
  border: 1px dashed #d9d9d9;
  border-radius: 9999px;
  
  top: 0;
  right: 5rem;
  color: #4f4f4f;

  &:hover {
    border-color: #70e0a8;
  }


  ${props => props.theme.mq.mobileL} {
    margin-left: -1rem;
    margin-bottom: 2rem;
    position: static;
    }
   
    ${props => props.theme.mq.laptop} {
      margin-left: 2rem;
      margin-bottom: 0rem;
      position: absolute;
    }


`;

export const ProfileListBlock = styled.p`
  display: flex;
  margin-bottom: 2rem;
  width: 20rem;
  height: 2rem;


  ${props => props.theme.mq.mobileL} {
    width: 18rem;
    }
   
    ${props => props.theme.mq.laptop} {
      width: 20rem;
    }

`;

export const EditButton = styled(Button)<Props>`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 8rem;
  height: 2rem;
  margin-top: 2rem;
  
`;

export const ChangeButton = styled(Button)<Props>`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 8rem;
  height: 2rem;
  margin-top: 2rem;
  background-color: #ffffff;
  border: 2px solid #26de81;
  color: #26de81;
  &:hover {
    background: #70e0a8;
    color: #ffffff;
  }



  ${props => props.theme.mq.mobileL} {
    margin-right:1rem;
  
  }
  
  ${props => props.theme.mq.laptop} {
    margin-right:0rem;
  }

  
`;

export const CancleButton = styled(Button)<Props>`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 8rem;
  height: 2rem;
  margin-top: 2rem;
  background-color: #ffffff;
  border: 2px solid #adb5bd;
  color: rgba(75, 85, 99, var(--tw-text-opacity));
  &:hover {
    --tw-bg-opacity: 1;
background-color: rgba(156, 163, 175, var(--tw-bg-opacity));;
color:  #ffffff;
  }



`;

export const AccountSetting = styled(Form)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  position: relative;


  ${props => props.theme.mq.mobileL} {
    padding: 1rem;
    }
   
    ${props => props.theme.mq.laptop} {
      padding: 3rem;
    }

`;

export const ChangePassword = styled.div`
  display: flex;
  margin-bottom: 2rem;
  & > p {
    width: 6rem;
    margin-right: 1rem;
  }
`;

export const DeletedAccount = styled.div`
  display: flex;

  & > p {
    width: 6rem;
    margin-right: 1rem;
  }
`;

export const AccountSettingButton = styled.p`
  display: inline-block;
  cursor: pointer;
  font-size: 0.875rem;
  text-align: center;
  text-decoration: underline;
  --tw-text-opacity: 1;
  background-color: transparent;
  border-radius: 0.25rem;

  &:hover {
    --tw-text-opacity: 1;
    color: rgba(17, 24, 39, var(--tw-text-opacity));
  }

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;


export const TextArea = styled.textarea`
  display: block;
  margin-top: 2rem;
  width: 100%;
  min-height: 100px;
  max-height: 300px;
  height: 7rem;
  appearance: none;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-width: 1px;
  border-radius: 0.5rem;
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
`;

export const LocationBlock = styled.div`
  display: flex;
  flex-direction: low;
  margin-top: 2rem;
  & > span {
    font-size: 1rem;
    margin-top: 0;
  }
`;

export const ProfileSettingList = styled.div`
  width: 6rem;
  margin-right: 1.875rem;
  margin-bottom: 1rem;
`;
export const SelfIntroForm = styled.div`
  
${props => props.theme.mq.mobileL} {
  width : 100%
  }
 
  ${props => props.theme.mq.laptop} {
    width : 90%
  }
`;


export const SelfIntro = styled.p`
  color: #4f4f4f;
  margin-bottom: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;

`;

export const CInputForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: center;
  align-items: center;
`;
export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 0;
`;


export const ImageEdit = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.5rem;
  border-width: 1px;
  border-radius: 9999px;
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  margin-bottom: 1rem;

  & > img {
    object-fit: cover;
    width: 100%;
    height: 6rem;
    border-radius: 9999px;
  }
`;
