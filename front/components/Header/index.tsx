import React from 'react'
import Link from 'next/link'
import { MainFrame, Logo } from './styles'
import Image from "next/image";

const Header = () => {
    return (
        
         <MainFrame>
             <Link href="/main">
                <Logo>
                <Image
        src="/logo_621x206.png"
        alt="logo"
        width={120}
        height={40}
      />
                </Logo>
             </Link>
         </MainFrame>
    )
}

export default Header
