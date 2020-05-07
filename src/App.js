import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import Homepage from './pages/hompeage/homepage-component'
import Shop from './pages/shop/shop-component'


const App=() => {
  return (
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route path='/shop' component={Shop} />
    </Switch>
  );
}

export default App
