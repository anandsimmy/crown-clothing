import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Homepage from './pages/hompeage/homepage-component'

const Hats=() => <h1>HATS PAGE</h1>

const App=() => {
  return (
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route path='/shop/hats' component={Hats} />
    </Switch>
  );
}

export default App;
