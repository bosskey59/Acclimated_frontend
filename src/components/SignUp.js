import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import LinkWithTooltip from './LinkWithTooltip'
import { Button, Grid, Row, Col, Navbar, Nav, NavItem, Table, Image, FormGroup, ControlLabel, FormControl, InputGroup, Radio, Alert } from 'react-bootstrap';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp_units: "farenheit",
      email:"",
      first_name:"",
      password:"",
      zip_code:"",
      errors:[]
    };
  }

  handleChanges = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validate = (name, email, password, zip) => {
    const errors = [];

    if (name.length === 0) {
      errors.push("First Name can't be empty");
    }

    if (email.length < 5) {
      errors.push("Email should be at least 5 charcters long");
    }
    if (email.split('').filter(x => x === '@').length !== 1) {
      errors.push("Email should contain a @");
    }
    if (email.indexOf('.') === -1) {
      errors.push("Email should contain at least one dot");
    }

    if (password.length < 6) {
      errors.push("Password should be at least 6 characters long");
    }

    if (zip.length < 5) {
      errors.push("Zip Code should be at least 5 charcters long");
    }

    return errors;
  }

  validationResults= (errors) =>{
    if(errors.length >0){
      return(
        <Alert bsStyle="danger" className="col-md-12">
          {errors.map( message => <p>{message}</p>)}
        </Alert>
      )
    }else{
      return null
    }
  }

  handleSubmit = (e) =>{
    e.preventDefault();

    const errors = this.validate(this.state.first_name, this.state.email, this.state.password, this.state.zip_code);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }else{
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
  }


  render() {
    console.log(this.state);
    if (!!localStorage.token){
      this.props.history.push('/home');
      return null
    }else{
      return (
        <div>
          <Navbar inverse>
            <Navbar.Header>
              <Nav pullLeft>
                <Link to="/">
                  <Image  responsive className=""src={require(`../images/acclimatedLogo01.png`)} />
                </Link>
              </Nav>
            </Navbar.Header>
          </Navbar>
          <Grid className="">
            <Row className="show-grid">
              <Col md={8} xs={10} mdOffset={2}  xsOffset={1} className="user-info ">
                <div className="col-md-12 margin-bottom"><h3>Sign Up</h3>*Required fields</div>
                {this.validationResults(this.state.errors)}
                <form onSubmit={e=>this.handleSubmit(e)}>
                  <FormGroup className="col-md-6" validationState="">
                    <ControlLabel className="pull-left" >*First Name</ControlLabel>
                    <FormControl type="text" name="first_name"  onChange={e=>this.handleChanges(e)} />
                  </FormGroup>
                  <FormGroup className="col-md-6" validationState="">
                    <ControlLabel className="pull-left">Last Name</ControlLabel>
                    <FormControl type="text" name="last_name" onChange={e=>this.handleChanges(e)}/>
                  </FormGroup>
                  <FormGroup className="col-md-6" validationState="">
                    <ControlLabel className="pull-left">*Email</ControlLabel>
                    <FormControl type="text" name="email" onChange={e=>this.handleChanges(e)} />
                  </FormGroup>
                  <FormGroup className="col-md-6" validationState="">
                    <ControlLabel className="pull-left">*Password</ControlLabel>
                    <FormControl type="password" name="password" onChange={e=>this.handleChanges(e)} />
                  </FormGroup>
                  <FormGroup className="col-md-6" validationState="">
                    <ControlLabel className="pull-left">*Zip Code
                      <LinkWithTooltip tooltip="Used for providing forecast based on location." href="#" id="tooltip-1">
                        <i className='glyphicon glyphicon-info-sign'></i>
                      </LinkWithTooltip>
                    </ControlLabel>
                    <FormControl type="number" name="zip_code" onChange={e=>this.handleChanges(e)} />
                  </FormGroup>
                  <FormGroup className="col-md-6" controlId="formControlsSelect">
                    <ControlLabel>What is your gender?
                      <LinkWithTooltip tooltip="Men and women tend to experience temperatures differently." href="#" id="tooltip-2">
                        <i className='glyphicon glyphicon-info-sign'></i>
                      </LinkWithTooltip>
                    </ControlLabel>
                    <FormControl name="gender" componentClass="select" placeholder="select" onChange={e=>this.handleChanges(e)}>
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup className="col-md-6" validationState="">
                    <ControlLabel className="pull-left">What's your date of birth?
                      <LinkWithTooltip tooltip="Age can affect the way you feel temperature." href="#" id="tooltip-3">
                        <i className='glyphicon glyphicon-info-sign'></i>
                      </LinkWithTooltip>
                    </ControlLabel>
                    <FormControl type="text" placeholder="mm/dd/yyyy" name="dob" onChange={e=>this.handleChanges(e)} />
                  </FormGroup>
                  <FormGroup className="col-md-6" validationState="">
                    <ControlLabel >How much do you weigh?
                      <LinkWithTooltip tooltip="Weight can affect the way you feel temperature." href="#" id="tooltip-3">
                        <i className='glyphicon glyphicon-info-sign'></i>
                      </LinkWithTooltip>
                    </ControlLabel>
                      <InputGroup>
                        <FormControl type="number" name="weight" onChange={e=>this.handleChanges(e)} />
                        <InputGroup.Addon>lbs</InputGroup.Addon>
                      </InputGroup>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <hr/>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <ControlLabel className="push-right">Temperature Units: </ControlLabel>
                    <Radio inline defaultChecked name="temp_units" value="farenheit" onChange={e=>this.handleChanges(e)}>°F</Radio>
                    <Radio inline name="temp_units" value="celcius" onChange={e=>this.handleChanges(e)}>°C</Radio>
                  </FormGroup>
                  <FormGroup className="col-md-12">
                    <ControlLabel className="push-right">Do you prefer cold or hot weather? </ControlLabel>
                    <Radio inline name="temp_preference" value="hot" onChange={e=>this.handleChanges(e)}>I prefer the heat</Radio>
                    <Radio inline name="temp_preference" value="cold" onChange={e=>this.handleChanges(e)}>I prefer the cold</Radio>
                  </FormGroup>
                  <FormGroup className="col-md-8" validationState="">
                    <ControlLabel className="pull-left">Given the choice, what temperature do you normally set your home's thermostat to?</ControlLabel>
                  </FormGroup>
                  <FormGroup className="col-md-4" validationState="">
                    <InputGroup>
                      <FormControl type="number" name="desired_temp" onChange={e=>this.handleChanges(e)} />
                      <InputGroup.Addon>°F</InputGroup.Addon>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="col-md-6" validationState="">
                    <Button bsStyle="primary" bsSize="large" type="submit">Submit</Button>
                  </FormGroup>
                </form>
              </Col>
            </Row>
          </Grid>
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

// <form onSubmit={e=>this.handleSubmit(e)}>
//   First Name:<input name="first_name" onChange={e=>this.handleChanges(e)} required/>
//   Last Name:<input name="last_name" onChange={e=>this.handleChanges(e)} required/>
//   <br/>
//   Email:<input name="email" onChange={e=>this.handleChanges(e)} required/>
// Password:<input name="password" type="password"onChange={e=>this.handleChanges(e)} required/>
//   <br/>
//   Zip Code:<input name="zip_code" onChange={e=>this.handleChanges(e)} required/>
//   What is your gender?
//   <select name="gender" onChange={e=>this.handleChanges(e)}>
//     <option value="female">Female</option>
//     <option value="male">Male</option>
//     <option value="other">Other</option>
//     <option value="Prefer not to say">Prefer not to say</option>
//   </select>
//   <br/>
//   Date of Birth:<input name="dob" onChange={e=>this.handleChanges(e)} required/>
//   How much do you weigh:<input name="weight" onChange={e=>this.handleChanges(e)} required/>
//   <br />
//   Temperature:
//   <input type="radio" name="temp_units" value="farenheit" onChange={e=>this.handleChanges(e)}/>°F
//   <input type="radio" name="temp_units" value="celcius" onChange={e=>this.handleChanges(e)}/>°C
//   <br />
//   Do you prefer cold or hot weather?
//   <br />
//   <input type="radio" name="temp_preference" value="hot" onChange={e=>this.handleChanges(e)}/>I prefer the heat
//   <input type="radio" name="temp_preference" value="cold" onChange={e=>this.handleChanges(e)}/>I prefer the cold
//   <br />
//   Given the choice, what temperature do you normally set your home's thermostat to?
//   <br />
//   <input name="desired_temp" onChange={e=>this.handleChanges(e)} type="number" required/>
//   <br />
//   <input type="submit"/>
// </form>
