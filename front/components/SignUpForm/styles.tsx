import styled from "@emotion/styled";
import Button from "@components/common/Button";
import palette from "@styles/palette";
export const SignUpFormBlock = styled.form`
  width: 80%;
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
  & > u {
    color: ${palette.gray[6]};
    text-decoration: underline;
  }
`;

export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
`;

export const SignUpButton = styled(Button)``;
