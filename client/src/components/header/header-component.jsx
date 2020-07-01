import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { HeaderContainer, LinkContainer, OptionsContainer, OptionLink } from './header-styles'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import CartIcon from '../cart-icon/cart-icon-component'
import CartDropdown from '../cart-dropdown/cart-dropdown-component'

import { signOutStart } from '../../redux/user/user-actions'
import { selectCartHidden } from '../../redux/cart/cart-selectors'
import { selectCurrentUser } from '../../redux/user/user-selectors'

const Header=({ currentUser, isCartHidden, signOutStart }) => {
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
                        <OptionLink as='div' onClick={signOutStart}>
                            SIGN OUT
                        </OptionLink>  :
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

const mapDispatchToProps= dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)