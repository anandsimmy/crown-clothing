import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";

import './App.css'

import Homepage from './pages/hompeage/homepage-component'
import Shop from './pages/shop/shop-component'
import Header from './components/header/header-component'
import SignInSignUp from './pages/signin-and-signup/signin-and-signup-component'
import { auth, createUserProfileInDB } from './firebase/firebase-utils'
import { setCurrentUser } from './redux/user/user-actions'


class App extends Component {

  unSubscribeFromAuthListener= null

  componentDidMount(){

    const { setCurrentUser }= this.props

    this.unSubscribeFromAuthListener= auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef= await createUserProfileInDB(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
        })
      }
      else{
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuthListener()
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shop} />
          <Route path='/signin' render={
            () => this.props.currentUser ? <Redirect to='/' /> : <SignInSignUp />
          } />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps= ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps= dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
