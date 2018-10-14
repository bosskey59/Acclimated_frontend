import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LogInForm from './components/LogIn'

class App extends Component {
  render() {
    return (
      <div className="App">

        <LogInForm/>
      </div>
    );
  }
}

export default App;
