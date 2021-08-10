import styled from "@emotion/styled";

export const MemberList = styled.div`
  width: 100%;
  margin: 30px 24px 0 0;
  display: flex;
  height: 100%;
`;

export const InnerMiddleMemberBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-top: 0;
  font-size: 0.875rem;
  align-items: flex-start;
`;
export const MemberImgBox = styled.img`
 
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 9999px;
    margin-right: 1rem;
    --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  
`;

export const MemberDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
`;

export const MemberBackGround = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
`;
