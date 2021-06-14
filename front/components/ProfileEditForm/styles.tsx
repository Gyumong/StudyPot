import styled from "@emotion/styled";
import Button from "@components/common/Button";

export const ProfileEditBlock = styled.div`
  width: 50vw;
  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
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
`;

export const ProfileInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 2rem;

  position: relative;

  & > img {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
  }
`;

export const ProfileListBlock = styled.p`
  display: flex;
  margin-bottom: 2rem;
  width: 20rem;
  height: 2rem;


`;


export const EditButton = styled(Button)`
font-size: 0.875rem;
line-height: 1.25rem;
font-weight: 500;
width: 8rem;
height: 2rem;
margin-top: 2rem;
`;


export const AccountSetting = styled.div`
  width: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  position: relative;
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

// export const Category = styled.div`
//   display: flex;
//   margin-top: 2rem;
//   height: 3rem;

// `;

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

export const SelfIntro = styled.p`
    color: #4f4f4f;
    margin-bottom: 1rem;
  `;
  

export const ProfileImage = styled.div`
  position: absolute;
  right: 6rem;

  & > button {
    display: inline-flex;
    border : 1px solid;
    border-radius: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    --tw-text-opacity: 1;
    color: rgba(75, 85, 99, var(--tw-text-opacity));
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));

    &:focus {
      outline: #26de81 solid 1px;
      box-shadow: 0px 2px 12px #00000030;
    }
  }
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