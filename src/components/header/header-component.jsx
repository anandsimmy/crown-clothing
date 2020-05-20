import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './header-styles.scss'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { auth } from '../../firebase/firebase-utils'
import CartIcon from '../cart-icon/cart-icon-component'
import CartDropdown from '../cart-dropdown/cart-dropdown-component'
import { selectCartHidden } from '../../redux/cart/cart-selectors'
import { selectCurrentUser } from '../../redux/user/user-selectors'

const Header=({ currentUser, isCartHidden }) => {
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
                !isCartHidden ?
                <CartDropdown /> : null 
            }
        </div>
    )
}

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser,
    isCartHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)