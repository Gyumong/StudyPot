import styled from "@emotion/styled";
import Button from "../common/Button";

export const BoxModel = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  max-width: 36rem;

  cursor: pointer;
`;

export const SettingBox = styled.div`
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.025em;
`;

export const Shrink = styled.div`
  width: 450px;
`;

export const TextBox = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 0.5rem;
  position: relative;
`;
export const TitleBox = styled.div`
  display: flex;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
  --tw-text-opacity: 1;
  color: rgba(31, 41, 55, var(--tw-text-opacity));
  letter-spacing: 0em;
`;

export const LikeButton = styled.button`
  display: block;
  margin-left: 0.75rem;
  text-align: center;
  width: 4em;
  padding: 0.375rem;
  border: 1px solid #26de81;
  border-radius: 0.25rem;
  margin-bottom: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  &:hover {
    background: #70e0a8;
    color: #ffffff;
  }
`;

export const Category = styled.p`
  display: block;
  text-align: center;
  width: 7em;
  padding: 0.1rem;
  border: 1px solid #26de81;
  border-radius: 0.25rem;
  margin-bottom: 0;
  color: #26de81;
  font-size: 0.65rem;
  line-height: 1rem;
`;

export const Detail = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  margin-right: 0.25rem;
`;

export const LocationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  float: right;
`;

export const LocationButton = styled.a`
  --tw-text-opacity: 1;
  color: rgba(156, 163, 175, var(--tw-text-opacity));
  font-size: 0.75rem;
  line-height: 1rem;
  margin-left: -0.2rem;
`;

export const UserImgBox = styled.div`
  & > img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 9999px;
    margin-right: 1rem;
    --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
`;

export const UserNameBox = styled.div`
  display: flex;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  margin-left: 0rem;
`;

export const UserName = styled.h2`
  font-weight: 600;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-transform: capitalize;
`;

export const Date = styled.span`
  --tw-text-opacity: 1;
  color: rgba(75, 85, 99, var(--tw-text-opacity));
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
`;

export const JoinButton = styled(Button)`
  position: absolute;
  right: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 8rem;
  height: 2rem;
  margin-top: 0.25rem;
`;
