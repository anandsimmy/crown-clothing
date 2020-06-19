import React, { useState } from 'react'
import { connect } from 'react-redux'

import './sign-up-styles.scss'

import FormInput from '../form-input/form-input-component'
import CustomButton from '../custom-button/custom-button-component'

import { signUpStart } from '../../redux/user/user-actions'

const SignUp=({ signUpStart }) => {

    const [userCreds, setUserCreds]= useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword }= userCreds

    const handleSubmit=async event => {
        event.preventDefault()
        if(password !== confirmPassword){
            alert('passwords donot match')
            return;
        }
        signUpStart({ displayName, email, password }) //dispatching signup-start action
    }

    const handleChange=(event) => {
        const { name, value }= event.target
        setUserCreds({
            ...userCreds,
            [name]: value
        })
    }


    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have an Account</h2>
            <span>Sign up with your Email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps= dispatch => ({
    signUpStart: userObj => dispatch(signUpStart(userObj))
})

export default connect(null, mapDispatchToProps)(SignUp)