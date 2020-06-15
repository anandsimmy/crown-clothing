import React from 'react'
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
//redux-stuff
import { selectCurrentUser } from './redux/user/user-selectors'

const App=(props) => (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shop} />
          <Route path='/checkout' component={CheckOut} />
          <Route path='/signin' render={
            () => props.currentUser ? <Redirect to='/' /> : <SignInSignUp />
          } />
        </Switch>
      </div>
  )

const mapStateToProps= createStructuredSelector({
  currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(App)
