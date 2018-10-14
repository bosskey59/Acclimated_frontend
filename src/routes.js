import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './App';
import SignUp from './components/SignUp'
import Home from './components/Home'

export default () => {
 return (
   <BrowserRouter>
     <Switch>
       <Route exact path='/' component={App}/>
       <Route exact path='/signUp' component={SignUp}/>
       <Route exact path='/Home' component={Home}/>

     </Switch>
   </BrowserRouter>
 )
}
