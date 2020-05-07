import React from 'react'
import { Link } from 'react-router-dom'

import './header-styles.scss'

import { ReactComponent as Logo } from '../../assets/logo.svg'

const Header=() => {
    return (
        <div className='header'>
            <div className='logo-conatiner'>
                    <Link to='/'>
                        <Logo className='logo'/>
                    </Link>
            </div>
            <div className='options'>
                <div className='option'>
                    <Link to='/shop'>SHOP</Link>
                </div>
                <div className='option'>
                    <Link to='/contact'>CONTACT</Link>
                </div>
            </div>
        </div>
    )
}

export default Header