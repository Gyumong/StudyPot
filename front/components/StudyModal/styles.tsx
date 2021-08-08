import styled from "@emotion/styled";
import Button from "../common/Button";

interface ButtonProps {
  onClick: (e: any) => void;
}

export const BoxModel = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  max-width: 40rem;
  max-height: 50rem;

  ${props => props.theme.mq.mobileL} {
    margin-top: 1.5rem;
    max-width: 30rem;
  }
 
  ${props => props.theme.mq.laptop} {
    margin-top: 0.5rem;
    max-width: 45rem;
  }
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

export const MainBox = styled.div`
  display: flex;
  padding: 2rem;
`;

export const Shrink = styled.div`
  max-width: 700px;

  ${props => props.theme.mq.mobileL} {
    max-width: 500px;
  }
 
  ${props => props.theme.mq.laptop} {
    max-width: 700px;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
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
  margin-left: 0.375rem;
  text-align: center;
  width: 3.5rem;
  height: 2rem;
  padding: 0.375rem;
  border: 1px solid #26de81;
  border-radius: 0.25rem;
  margin-bottom: 0;
  
  line-height: 1rem;
  &:hover {
    background: #70e0a8;
    color: #ffffff;
  }


  ${props => props.theme.mq.mobileL} {
    font-size: 0.75rem;
  }
  
  ${props => props.theme.mq.laptop} {
    font-size: 1rem;
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
  padding-top: 3rem;
  padding-bottom: 8rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  margin-right: 0.25rem;


  ${props => props.theme.mq.mobileL} {
    padding-bottom: 4rem;
  }
  
  ${props => props.theme.mq.laptop} {
    padding-bottom: 8rem;
  }
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
export const Top = styled.div``;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserBox = styled.div`
  display: flex;
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
  right: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 8rem;
  height: 2rem;
  margin-top: 0.25rem;

  ${props => props.theme.mq.mobileL} {
    display: none;
  }
  
  ${props => props.theme.mq.laptop} {
    display: flex;
  }
`;

export const MemberBox = styled.div`
  width: 50%;
  height: 25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const BackGround = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
`;

export const InnerTop = styled.div`
  display: flex;
`;

export const InnerMiddle = styled.div`
  display: flex;
  padding: 1rem;
  font-size: 0.875rem;
`;

export const MemberButton = styled(Button)`
  position: relative;
  font-size: 0.875rem;
  width: 8rem;
  height: 2rem;
  background-color: #ffffff;
  border: 1px solid #26de81;
  color: #26de81;
  &:hover {
    background: #70e0a8;
    color: #ffffff;
  }
`;

export const InnerBottom = styled.div``;

export const ApplyButton = styled(Button)<ButtonProps>`
  margin-left: 13rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 5rem;
  height: 5rem;
  margin-top: 0.25rem;
  border-radius: 9999px;


${props => props.theme.mq.mobileL} {
  margin-left: 5.5rem;
}
${props => props.theme.mq.laptop} {
  margin-left: 13rem;
}
`;
