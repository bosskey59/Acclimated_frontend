import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import '../App.css';
import { Button, Grid, Row, Col, Form , FormGroup, FormControl, ControlLabel, Image } from 'react-bootstrap';



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
   e.target.reset();
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
         this.props.history.push('/home');
       } else {
         alert(data.message)

       }
     });
 };

  render() {
    console.log(this.state);
    return (
      <Grid className="full">
        <Row className="show-grid full">
          <Col  md={6} mdPush={6}  className="full pad-top">
            <form onSubmit={this.logIn}>
              <FormGroup className="col-xs-5 col-md-5" controlId="email" validationState="">
                <ControlLabel className="pull-left">Email</ControlLabel>
                <FormControl type="text" name="email" placeholder="email" onChange={e=>this.handleChanges(e)} />
              </FormGroup>
              <FormGroup className="col-xs-5 col-md-5" controlId="password" validationState="">
                <ControlLabel className="pull-left">Password</ControlLabel>
                <FormControl type="password" name="password" placeholder="password" onChange={e=>this.handleChanges(e)} />
              </FormGroup>
              <FormGroup className="col-xs-3 col-md-2">
                <ControlLabel className="pull-left">&nbsp;</ControlLabel>
                <Button bsStyle="primary" type="submit">Log In</Button>
              </FormGroup>
            </form>

            <div className="pull-left full center">
              <div className="col-xs-12 col-md-12">
                <h3>See what to wear based on your preferences.</h3>
                <h3>Join Acclimated today.</h3>
                <Link to="/signUp">
                  <Button bsSize="large" >Sign Up</Button>
                </Link>
              </div>
            </div>
          </Col>
          <Col md={6} mdPull={6} className="full pad-top">
            <Row>
              <Col>
                <Image  responsive src={require(`../images/acclimatedLogo01.png`)} />
              </Col>
            </Row>
            <Row className="pull-left full center">
              <Row >
                <Col md={2} className="vcenter pad-top-icons">
                  <Image  responsive   src={require(`../images/tshirt_icon.png`)} />
                </Col>
                <Col md={10} className="vcenter pad-top-icons" >
                  <h4>Take the guesswork out of weather apps.</h4>
                </Col>
                <Col md={2} className="vcenter pad-top-icons">
                  <Image  responsive   src={require(`../images/tshirt_icon.png`)} />
                </Col>
                <Col md={10} className="vcenter pad-top-icons" >
                  <h4>Get personalized reccomendations.</h4>
                </Col>
                <Col md={2} className="vcenter pad-top-icons">
                  <Image  responsive   src={require(`../images/tshirt_icon.png`)} />
                </Col>
                <Col md={10} className="vcenter pad-top-icons" >
                  <h4>Finally, a simpler approach to weather.</h4>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    currentUser: (user) => dispatch({type: "SET_USER", payload:user}),

  }
}

export default withRouter(connect(null, mapDispatchToProps)(LogInForm))

// <h4>Get personalized reccomendations.</h4>
// <h4>Finally, a simpler approach to weather.</h4>
