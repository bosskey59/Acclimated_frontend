import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';



class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    const token = localStorage.token;
    fetch("http://localhost:3000/account", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.message) {
          this.props.currentUser(data)
          this.props.history.push('/home')
        }
      });
  }

  handleChanges = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logIn = e => {
   e.preventDefault();

   fetch("http://localhost:3000/login", {
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
         this.props.currentUser(data.user);
         this.props.history.push('/home');
       } else {
         alert(data.message)
       }
     });
 };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.logIn}>
          <input type="text" name="email" placeholder="email" onChange={e=>this.handleChanges(e)}/>
          <input type="password" name="password" placeholder="password" onChange={e=>this.handleChanges(e)}/>
          <input type="submit"/>
        </form>
        <Link to="/signUp">
          <button>Sign Up</button>
        </Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    currentUser: (user) => dispatch({type: "SET_USER", payload:user}),

  }
}

export default withRouter(connect(null, mapDispatchToProps)(LogInForm))
