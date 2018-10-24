import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import '../index.css';

import { Button, Grid, Row, Col, Navbar, Nav, NavItem, Table, Image } from 'react-bootstrap';


const handleTemp=(tempInF,units) => {
  const tempInC = Math.round((tempInF-32)*(5/9))
  if(units ==="celcius"){
    return `${tempInC} °C`
  }else{
    return `${tempInF} °F`
  }
}

const createSuggestion = (item, accessory) =>{
  //both empty
  if(!!!item && !!!accessory){
    return null
  //item has something and access does not
  }else if (!!item && !!!accessory) {
    return(
      <div className="col-md-12">
        <Image responsive  className="item center-block"src={require(`../images/${item}.png`)} />
      </div>
    )
    //accessory has something and item does not (this should never happen)
  }else if (!!!item && !!accessory) {
    return(
      <div className="col-md-12">
        <Image responsive  className="item center-block"src={require(`../images/${accessory}.png`)} />
      </div>
    )
  }else{
    return(
      <Row>
        <div className="col-md-5 col-sm-5 col-xs-12 vcenter">
          <Image responsive  className="item center-block"src={require(`../images/${item}.png`)} />
        </div>
        <div className="col-md-2 col-sm-2 col-xs-12 vcenter">
          <Image responsive  className="item center-block"src={require(`../images/plusSign.png`)} />
        </div>
        <div className="col-md-5 col-sm-5 col-xs-12 vcenter">
          <Image responsive  className="item center-block"src={require(`../images/${accessory}.png`)} />
        </div>
      </Row>
    )
  }
}

const userMessage = (itemAccessory) =>{
  switch (itemAccessory) {
    case "shorts":
      return ("It's really hot today, good day for shorts.")
    case "t_shirt":
      return ("It's not too hot or cold outside, t-shirt time.")
    case "sweater":
      return ("It's chilly outside, so be sure to wear a sweater!")
    case "jacket":
      return ("It's cold out there, wear a jacket today!")
    case "umbrella":
      return ("There's a good chance of rain as well, so pack an umbrella!")
    case "snow_boots":
      return ("There's a good chance of snow today, so wear some snow boots!")
    default: return null
  }
}

const weatherIcon = (icon) =>{
  if(icon === "clear-day"){
    return (
      <div className="icon sunny">
        <div className="sun">
          <div className="rays"></div>
        </div>
      </div>
    )
  }else if (icon==="rain") {
    return(
      <div className="icon rainy">
        <div className="cloud"></div>
        <div className="rain"></div>
      </div>
    )

  }else if (icon==="snow") {
    return(
      <div className="icon flurries">
        <div className="cloud"></div>
        <div className="snow">
          <div className="flake"></div>
          <div className="flake"></div>
        </div>
      </div>
    )
  }else if (icon ==="cloudy" || icon ==="partly-cloudy-day" || icon==="partly-cloudy-night"){
    return(
      <div className="icon cloudy">
        <div className="cloud"></div>
        <div className="cloud"></div>
      </div>
    )
  }else{
    return null
  }
}

const Home = (props) =>{
  console.log(props);
  if(!props.user){
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
          props.currentUser(data)
        }else{
          props.history.push('/')
        }
      })

    return null
  }else{
    return(
      <div>
        <Navbar inverse>
          <Nav pullLeft>
            <Image  responsive src={require(`../images/acclimatedLogo01.png`)} />
          </Nav>
          <Nav pullRight>
            <li>
              <Link to="/">
                <Button onClick={props.logout}>Log Out</Button>
              </Link>
            </li>
          </Nav>
        </Navbar>

        <Grid className="">
          <Row className="show-grid">
            <Col md={6} xs={10} mdOffset={3}  xsOffset={1} className="text-center user-info ">
              <h3>Hello {props.user.first_name}, here is your Forecast:</h3>
              {weatherIcon(props.user.weather_forecast.summary)}
              <Row>
                <div className="col-xs-8 col-xs-offset-2 margin-bottom">
                  <Row>
                    <div className="col-xs-4">Lo</div>
                    <div className="col-xs-4"><strong>Avg.</strong></div>
                    <div className="col-xs-4">Hi</div>
                  </Row>
                  <Row>
                    <div className="col-xs-4">{handleTemp(props.user.weather_forecast.temp_lo,props.user.temp_units )}</div>
                    <div className="col-xs-4"><strong>{handleTemp(props.user.weather_forecast.avg_temp,props.user.temp_units)}</strong></div>
                    <div className="col-xs-4">{handleTemp(props.user.weather_forecast.temp_hi,props.user.temp_units)}</div>
                  </Row>
                </div>
              </Row>
              {createSuggestion(props.user.clothing_suggestion.item_1,props.user.clothing_suggestion.accessory_1 )}
              <div className="bold">
                {userMessage(props.user.clothing_suggestion.item_1)}
              </div>
              <div>
                {userMessage(props.user.clothing_suggestion.accessory_1)}
              </div>
            </Col>
          </Row>
        </Grid>


    </div>
    )
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
    logout: () => dispatch({type:"LOGOUT"})
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))
