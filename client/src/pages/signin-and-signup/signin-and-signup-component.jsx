import React from 'react'

import SignIn from '../../components/sign-in/sign-in-component'
import SignUp from '../../components/sign-up/sign-up-component'

import './signin-and-signup-styles.scss'

const SignInSignUp=() => {
    return (
    <div className='signin-signup-form '>
        <SignIn />
        <SignUp />
    </div>)
}

export default SignInSignUp