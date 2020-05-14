import React, { Component} from 'react'

import FormInput from '../form-input/form-input-component'
import CustomButton from '../custom-button/custom-button-component'
import { auth, createUserProfileInDB } from '../../firebase/firebase-utils'

import './sign-up-styles.scss'

class SignUp extends Component {
    constructor(){
        super()
        this.state={
            displayName: null,
            email: null,
            password: null,
            confirmPassword: null
        }
    }

    handleSubmit=async event => {
        event.preventDefault()
        const { displayName, email, password, confirmPassword }= this.state
        if(password !== confirmPassword){
            alert('passwords donot match')
            return;
        }
        try{
            const { user }= await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileInDB(user, { displayName })
            this.setState({
                displayName: null,
                email: null,
                password: null,
                confirmPassword: null
            })
        }
        catch (error){
            console.log(error)
        }

    }

    handleChange=(event) => {
        const { name, value }= event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        const { displayName, email, password, confirmPassword }= this.state
        return(
            <div className='sign-up'>
                <h2 className='title'>I don't have an Account</h2>
                <span>Sign up with your Email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp