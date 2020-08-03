import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect'
//styles
import { GlobalStyle } from './global-styles'
//components
import Header from './components/header/header-component'
import Spinner from './components/spinner/spinner-component'
//redux-stuff
import { selectCurrentUser } from './redux/user/user-selectors'
import { checkUserSession } from './redux/user/user-actions'
//lazy loading pages
const Homepage= lazy(()=>import('./pages/homepage/homepage-component'))
const Shop= lazy(()=>import('./pages/shop/shop-component'))
const SignInSignUp= lazy(()=>import('./pages/signin-and-signup/signin-and-signup-component'))
const CheckOut= lazy(()=>import('./pages/checkout/checkout-component'))

const App=({ checkUserSession, currentUser }) => {

  useEffect(()=>{
    checkUserSession()
  }, [checkUserSession])

  return(
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shop} />
          <Route path='/checkout' component={CheckOut} />
          <Route path='/signin' render={
            () => currentUser ? <Redirect to='/' /> : <SignInSignUp />
          } />
        </Suspense>
      </Switch>
    </div>
  )
}
const mapStateToProps= createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps= dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
