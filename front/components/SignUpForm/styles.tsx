import styled from "@emotion/styled";
import Button from "@components/common/Button";
export const SignUpFormBlock = styled.form`
  width: 80%;
  max-width: 900px;
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
  font-size: 2rem;
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

export const SignUpButton = styled(Button)`
  width: 50%;
`;
