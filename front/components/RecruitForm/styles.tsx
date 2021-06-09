import styled from "@emotion/styled";
import Button from "@components/common/Button";
import chroma from "chroma-js";


export const colourStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
    option: (styles: { [x: string]: any }, { data, isDisabled, isFocused, isSelected }: any) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
        color: isDisabled ? "#ccc" : isSelected ? (chroma.contrast(color, "white") > 2 ? "white" : "black") : data.color,
        cursor: isDisabled ? "not-allowed" : "default",
  
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles: any, { data }: any) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };
  
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
  
  export const RecruitSubmitForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 2rem;
  
    position: relative;
  
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
  

  export const Category = styled.div`
    display: flex;
    margin-top: 2rem;
    height: 3rem;
    
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