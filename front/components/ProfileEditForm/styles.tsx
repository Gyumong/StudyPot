/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

export const ProfileSubmitForm = styled.form`
  width: 100%;

  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  & > img {
    border-radius: 50%;
  }
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
    margin-top: 0;
  }
`;

export const Interest = styled.div`
  margin-bottom: 3rem;
  & > p {
    font-size: 1rem;
    color: #bdbdbd;
    margin-top: 0;
  }
`;

export const SelfIntro = styled.p`
  color: #4f4f4f;
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
