import styled from "@emotion/styled";
import Button from "../common/Button";


interface Props {
  name?: string;
  className?: string;
  onClick?: (e: Event) => void;
}
export const MainFrame = styled.div`
  display: flex;
  position: fixed;
  z-index: 30;
  width: 100vw;
  top: 0;
  left: 0;
  height: 5rem;
  background-color: white;
  border-bottom: 1px solid #eeefee;


  ${props => props.theme.mq.mobileL} {
    height: 6rem;
   }
  
   ${props => props.theme.mq.laptop} {
    height: 5rem;
   }

`;

export const Logo = styled.a`
  position: relative;
  
  left: 5%;
  text-decoration: none;
  cursor: pointer;

  ${props => props.theme.mq.mobileL} {
    top: 2rem;
   width: 20%;
  }
 
  ${props => props.theme.mq.laptop} {
    width: 100%;
    top: 1rem;
  }

 
`;

export const MenuFrame = styled.ul`
  display: flex;
  position: absolute;
  
  left: 40%;
  color: #4f4f4f;

  ${props => props.theme.mq.mobileL} {
    top: 1.5rem;
    left: 28%;
   }
  
   ${props => props.theme.mq.laptop} {
    top: 0.5rem;
    left: 40%;
   }
 
`;

export const MenuItem = styled.li`
  font-size: 1rem;
  padding-top: 1rem;
  float: left;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #26de81;
  }
  & + & {
    margin-left: 2rem;
  }

  ${props => props.theme.mq.mobileL} {
    font-size: 0.875rem;
    }
   
    ${props => props.theme.mq.laptop} {
      font-size: 1rem;
    }
`;

export const ButtonFrame = styled.div`
  position: absolute;
  top: 0;
  left: 74%;
  ${props => props.theme.mq.mobileL} {
    left: 65%;
    margin-top: 1rem;
    }
   
    ${props => props.theme.mq.laptop} {
      margin-top: 0rem;
      left: 74%;
    }
`;

export const RegisterButton = styled(Button)`
  position: relative;
  width: 8rem;
  height: 3rem;
  margin-left: 1rem;
  


  ${props => props.theme.mq.mobileL} {
    margin-top: 0rem;
    margin-left: 0rem;
    font-size: 0.875rem;
    width: 4.5rem;
  height: 4.5rem;
  border-radius:1rem;

    }
   
    ${props => props.theme.mq.laptop} {
      margin-left: 1rem;
      font-size: 1rem;
      width: 8rem;
      height: 3rem;
      border-radius:0.5rem;
      margin-top: 1rem;
    }
 
`;

export const LoginButton = styled(Button)<Props>`
  position: relative;
  width: 8rem;
  height: 3rem;
  margin-top: 1rem;
  background-color: #ffffff;
  border: 2px solid #26de81;
  color: #26de81;
  &:hover {
    background: #70e0a8;
    color: #ffffff;
  }

  ${props => props.theme.mq.mobileL} {
    margin-top: 0rem;
    font-size: 0.875rem;
    width: 4.5rem;
  height: 4.5rem;
  border-radius:1rem;
  margin-right:1rem;

    }
   
    ${props => props.theme.mq.laptop} {
      font-size: 1rem;
      width: 8rem;
  height: 3rem;
  border-radius:0.5rem;
  margin-right:0rem;
  margin-top: 1rem;

    }
`;
