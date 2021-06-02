import styled from "@emotion/styled";
import Button from "@components/common/Button";
import palette from "@styles/palette";
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

export const SignUpFormBlock = styled.form`
  width: 80vw;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  color: #4f4f4f;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 1rem;
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

export const Desc = styled.div`
  margin-top: 2.5rem;
  color: #828282;
  font-size: 1rem;
  line-height: 1.8;
  white-space: pre-wrap;
  text-align: center;
  letter-spacing: -0.015em;
  font-weight: 300;
  & > strong {
    color: ${palette.gray[7]};
    font-weight: 500;
  }
  & > a {
    color: ${palette.gray[7]};
    font-weight: 500;
    text-decoration: underline;
  }
  & > u {
    color: ${palette.gray[6]};
    text-decoration: underline;
  }
`;

export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
`;

export const Success = styled.div`
  color: #2eb67d;
  font-weight: bold;
`;
export const SignUpButton = styled(Button)`
  margin-top: 2rem;
`;

export const SelfIntro = styled.p`
  color: #4f4f4f;
`;

export const SignUpInnerBox = styled.p``;

export const Interest = styled.div`
  margin-bottom: 3rem;
  & > p {
    font-size: 1rem;
    color: #bdbdbd;
    margin-top: 0;
  }
`;

export const SelectBox = styled.div`
  padding-top: 2rem;
  font-size: 1rem;
`;
