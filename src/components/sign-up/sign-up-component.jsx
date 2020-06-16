import React, { Component} from 'react'
import { connect } from 'react-redux'

import './sign-up-styles.scss'

import FormInput from '../form-input/form-input-component'
import CustomButton from '../custom-button/custom-button-component'

import { signUpStart } from '../../redux/user/user-actions'

class SignUp extends Component {
    constructor(){
        super()
        this.state={
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit=async event => {
        event.preventDefault()

        const { displayName, email, password, confirmPassword }= this.state
        const { signUpStart }= this.props

        if(password !== confirmPassword){
            alert('passwords donot match')
            return;
        }
        console.log('sign-up', email, password)
        signUpStart({ displayName, email, password })
        this.setState({
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
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
                <h2 className='title'>I do not have an Account</h2>
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

const mapDispatchToProps= dispatch => ({
    signUpStart: userObj => dispatch(signUpStart(userObj))
})

export default connect(null, mapDispatchToProps)(SignUp)