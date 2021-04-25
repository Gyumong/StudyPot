import React from 'react'
import Link from 'next/link'
import { MainHeader } from './styles'

const Header = () => {
    return (
        <Link href="/main">
            <MainHeader/>
        </Link>
    )
}

export default Header
