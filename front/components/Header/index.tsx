import React from 'react'
import Link from 'next/link'
import { MainFrame, Logo, MenuFrame, Find, Recruit, ButtonFrame, RegisterButton, LoginButton } from './styles'
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
                <Link href="/find">
                    <Find>
                    스터디찾기
                    </Find>
                </Link>

                <Link href="/recruit">
                    <Recruit>
                    스터디모집
                    </Recruit>
                </Link>
            </MenuFrame>

             <ButtonFrame>
                <LoginButton> Log in </LoginButton>
                <RegisterButton> Register </RegisterButton>
            </ButtonFrame>
         </MainFrame>
    )
}

export default Header
