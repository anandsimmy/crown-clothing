import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import Homepage from './pages/hompeage/homepage-component'
import Shop from './pages/shop/shop-component'
import Header from './components/header/header-component'
import SignInSignUp from './pages/signin-and-signup/signin-and-signup-component'
import { auth } from './firebase/firebase-utils'


class App extends Component {

  constructor(){
    super()

    this.state={
      currentUser: null
    }
  }

  unSubscribeFromAuth= null

  componentDidMount(){
    this.unSubscribeFromAuth= auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log(this.state.currentUser)
    })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shop} />
          <Route path='/signin' component={SignInSignUp} />
        </Switch>
      </div>
    );
  }

}

export default App
