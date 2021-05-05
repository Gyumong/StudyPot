import React from 'react'
import Link from 'next/link'
import { MainFrame, Logo, MenuFrame, MenuItem, ButtonFrame, RegisterButton, LoginButton } from './styles'
import Image from "next/image";

const Header = () => {
    return (
        
         <MainFrame>
             <Link href="/">
                <Logo>
                <Image
        src="/logo_621x206.png"
        alt="logo"
        width={120}
        height={40}
      />
                </Logo>
             </Link>
            
            <MenuFrame>
                <MenuItem>
                    <Link href="/find">
                        스터디찾기
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link href="/recruit">
                        스터디모집
                    </Link>
                </MenuItem>    
            </MenuFrame>

             <ButtonFrame>
                <Link href="/login">
                    <LoginButton> 
                            Log in
                    </LoginButton>
                </Link>
                
                <Link href="signup">
                    <RegisterButton> 
                            Register
                    </RegisterButton>
                </Link>
            </ButtonFrame>
         </MainFrame>
    )
}

export default Header
