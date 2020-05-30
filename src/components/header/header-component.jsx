import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { HeaderContainer, LinkContainer, OptionsContainer, OptionLink, OptionDiv } from './header-styles'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { auth } from '../../firebase/firebase-utils'
import CartIcon from '../cart-icon/cart-icon-component'
import CartDropdown from '../cart-dropdown/cart-dropdown-component'
import { selectCartHidden } from '../../redux/cart/cart-selectors'
import { selectCurrentUser } from '../../redux/user/user-selectors'

const Header=({ currentUser, isCartHidden }) => {
    return (
        <HeaderContainer>
            <LinkContainer to='/'>
                <Logo className='logo'/>
            </LinkContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/contact'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ? 
                        <OptionDiv onClick={() => auth.signOut()}>
                            SIGN OUT
                        </OptionDiv>  :
                        <OptionLink to='/signin'>
                            SIGN IN
                        </OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {   
                !isCartHidden ?
                <CartDropdown /> : null 
            }
        </HeaderContainer>
    )
}

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser,
    isCartHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)