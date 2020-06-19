import React, { useState } from 'react'
import { connect } from 'react-redux'

import './sign-in-styles.scss'

import FormInput from '../form-input/form-input-component'
import CustomButton from '../custom-button/custom-button-component'   
import { googleSignInStart, emailSignInStart } from '../../redux/user/user-actions'

const SignIn=({ emailSignInStart, googleSignInStart }) => {

    const [userCreds, setUserCreds]= useState({
        email: '',
        password: ''
    })

    const { email, password }= userCreds

    const handleSubmit=async event => {
        event.preventDefault()
        emailSignInStart(email, password)
    }

    const handleChange=(event) => {
        const { name, value }= event.target
        setUserCreds({
            ...userCreds,
            [name]: value
        })
    }

        return (
            <div className='sign-in'>
                <h2 className='title'>I already have an Account</h2>
                <span>Sign in with your Email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        type='email' 
                        name='email'
                        value={email}
                        handleChange={handleChange}
                        label='Email'
                        required />
                    <FormInput 
                        type='password'
                        name='password' 
                        value={password}
                        handleChange={handleChange} 
                        label='Password' 
                        required/>
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                            Sign In With Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
}

const mapDispatchToProps= dispatch => ({
    googleSignInStart: ()=> dispatch(googleSignInStart()),
    emailSignInStart: (email, password)=> dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)