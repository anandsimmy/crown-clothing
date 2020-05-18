import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './header-styles.scss'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { auth } from '../../firebase/firebase-utils'
import CartIcon from '../cart-icon/cart-icon-component'
import CartDropdown from '../cart-dropdown/cart-dropdown-component'

const Header=({ currentUser, isDropdownHidden }) => {
    return (
        <div className='header'>
            <div className='logo-conatiner'>
                    <Link to='/'>
                        <Logo className='logo'/>
                    </Link>
            </div>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ? 
                        <div className='option' onClick={() => auth.signOut()}>
                            SIGN OUT
                        </div>  :
                    <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {   
                !isDropdownHidden ?
                <CartDropdown /> : null 
            }
        </div>
    )
}

const mapStateToProps= ({ user: { currentUser }, cart: { hidden } }) => ({
    currentUser: currentUser,
    isDropdownHidden: hidden
})

export default connect(mapStateToProps)(Header)