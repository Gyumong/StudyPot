import styled from "@emotion/styled";

export const AuthTemplateBlock = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;


${props => props.theme.mq.mobileL} {
  min-height: 120vh;
  top: 6rem;
  
}

${props => props.theme.mq.laptop} {
  min-height: 150vh;
  top: 0;
  bottom: 0;
}


`;

export const WhiteBox = styled.div`
margin-top: 1rem;
  margin-bottom: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  --tw-bg-opacity: 1;
background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
--tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);


${props => props.theme.mq.mobileL} {
  
  width: 90vw;
}

${props => props.theme.mq.laptop} {
 
  width: 50vw;
}

`;
