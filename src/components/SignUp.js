import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChanges = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.message) {
          localStorage.token = data.token;
          this.props.history.push('/home');
        } else {
          alert(data.message)
        }
      });
  }

  render() {
    console.log(this.state);
    if (!!localStorage.token){
      this.props.history.push('/home');
      return null
    }else{
      return (
        <div>
          <h1>Sign Up</h1>
          <form onSubmit={e=>this.handleSubmit(e)}>
            First Name:<input name="first_name" onChange={e=>this.handleChanges(e)} required/>
            Last Name:<input name="last_name" onChange={e=>this.handleChanges(e)} required/>
            <br/>
            Email:<input name="email" onChange={e=>this.handleChanges(e)} required/>
          Password:<input name="password" type="password"onChange={e=>this.handleChanges(e)} required/>
            <br/>
            Zip Code:<input name="zip_code" onChange={e=>this.handleChanges(e)} required/>
            What is your gender?
            <select name="gender" onChange={e=>this.handleChanges(e)}>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <br/>
            Date of Birth:<input name="dob" onChange={e=>this.handleChanges(e)} required/>
            How much do you weigh:<input name="weight" onChange={e=>this.handleChanges(e)} required/>
            <br />
            Temperature:
            <input type="radio" name="temp_units" value="farenheit" onChange={e=>this.handleChanges(e)}/>°F
            <input type="radio" name="temp_units" value="celcius" onChange={e=>this.handleChanges(e)}/>°C
            <br />
            Do you prefer cold or hot weather?
            <br />
            <input type="radio" name="temp_preference" value="hot" onChange={e=>this.handleChanges(e)}/>I prefer the heat
            <input type="radio" name="temp_preference" value="cold" onChange={e=>this.handleChanges(e)}/>I prefer the cold
            <br />
            Given the choice, what temperature do you normally set your home's thermostat to?
            <br />
            <input name="desired_temp" onChange={e=>this.handleChanges(e)} type="number" required/>
            <br />
            <input type="submit"/>
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return {
    currentUser: (user) => dispatch({type: "SET_USER", payload:user}),

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
// t.string "first_name"
//   t.string "last_name"
//   t.string "email"
//   t.string "dob"
//   t.integer "zip_code"
//   t.string "password_digest"
//   t.string "gender"
//   t.integer "weight"
//   t.string "temp_units"
//   t.string "wind_units"
//   t.boolean "notifications"
//   t.string "time_format"
//   t.string "temp_preference"
//   t.string "desired_temp"
