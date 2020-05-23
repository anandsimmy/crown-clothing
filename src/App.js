import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect'
//styles
import './App.css'
//pages
import Homepage from './pages/homepage/homepage-component'
import Shop from './pages/shop/shop-component'
import SignInSignUp from './pages/signin-and-signup/signin-and-signup-component'
import CheckOut from './pages/checkout/checkout-component'
//components
import Header from './components/header/header-component'
//firebase-utils
import { auth, createUserProfileInDB } from './firebase/firebase-utils'
//redux-stuff
import { setCurrentUser } from './redux/user/user-actions'
import { selectCurrentUser } from './redux/user/user-selectors'

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
          <Route path='/checkout' component={CheckOut} />
          <Route path='/signin' render={
            () => this.props.currentUser ? <Redirect to='/' /> : <SignInSignUp />
          } />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps= createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps= dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
