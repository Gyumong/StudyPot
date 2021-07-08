import styled from "@emotion/styled";



export const BoxModel = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;

  padding-right: 1rem;
  align-items: center;
  top: 7rem;
  left: 30rem;
  width: 30rem;
  height: 5rem;
  border-radius: 9999px;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  font-size: 0.875rem;
  line-height: 1.25rem;


  ${props => props.theme.mq.mobileL} {
    left: 2.5rem;
    width: 25rem;
  height: 5rem;
    }
   
    ${props => props.theme.mq.laptop} {
      left: 30rem;
      width: 30rem;
  height: 5rem;
    }

`;

export const OnOffline = styled.div`
  width: 10rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 9999px;

  & > p {
    font-weight: 500;
    color: #4f4f4f;
  }

  & > span {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #828282;
  }

  & > ul {
    display: none;
    margin-top: 0.5rem;
    width: 7rem;
    height: 8.5rem;
    border-radius: 1.5rem;
    background-color: ;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    & > li {
      margin-bottom: 1rem;
    }
  }

  cursor: pointer;
  &:hover {
    background-color: #ebebea;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  &:hover > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 5rem;
    width: 7rem;
    height: 8.5rem;
  }

  transition: 0.125s all ease-in;

  &:focus > ul {
    outline: none;
    box-shadow: 0px 2px 12px #00000030;
  }
`;

export const OnOffList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  margin-top: 14.5rem;
  margin-left: 1.5rem;
  width: 7rem;
  height: 9rem;
  border-radius: 1.5rem;
  background-color: ;
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  & > li {
    display: flex;
    text-align: center;
    width: 7rem;
    height: 3rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #ebebea;
    }
  }
`;

export const ListTypeValue = styled.li`
  display: flex;
  text-align: center;
  width: 7rem;
  height: 3rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ebebea;
  }
`;

export const Type = styled.div`
  width: 12rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 9999px;

  &:hover {
    background-color: #ebebea;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  transition: 0.125s all ease-in;
  &:focus {
    outline: none;
    box-shadow: 0px 2px 12px #00000030;
  }
`;

export const TypeInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    font-weight: 500;
    color: #4f4f4f;
  }
  & > span {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #828282;
  }
`;

export const TypeDropDown = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align : center;
  position: absolute;
  margin-top: 19.5rem;
  margin-left: 1.5rem;
  width: 12rem;
  height: 14rem;
  border-radius: 1.5rem;
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  & > li {
    display: inline-block;
   
    align-items: 
    width: 12rem;
    height: 3rem;
    cursor: pointer;
    margin-bottom:1rem;

    &:hover {
      background-color:#EBEBEA;
    }
}

`;

export const FindButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  background-color: #26de81;
  color: white;
  &:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(95, 228, 161, var(--tw-bg-opacity));
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  &:focus {
    outline: none;
    box-shadow: 0px 2px 12px #00000030;
  }
`;
