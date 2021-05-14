import styled from "@emotion/styled";
import Button from "@components/common/Button";

export const ProfileFormBlock = styled.div`
  padding: 0;
  display: flex;
`;

export const DescBlock = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;
export const ImageBlock = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;
  & > img {
    border-radius: 50%;
  }
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
    margin-top: 0;
  }
`;

export const Interest = styled.div`
  display: flex;
  flex-direction: low;
  & > p {
    color: #bdbdbd;
    margin-top: 0;
  }
`;

export const SelfIntro = styled.p`
  color: #4f4f4f;
`;

export const ProfileEditButton = styled(Button)`
  margin-top: 1rem;
  width: 8rem;
  height: 2rem;
`;
