import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import Homepage from './pages/hompeage/homepage-component'
import Shop from './pages/shop/shop-component'
import Header from './components/header/header-component'


const App=() => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={Shop} />
      </Switch>
    </div>
  );
}

export default App
