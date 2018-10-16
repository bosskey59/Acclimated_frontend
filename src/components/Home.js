import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

const logOut=()=>{
  localStorage.token=""
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
      <h1>Your Email is {props.user.email}</h1>

        <table>
          <tbody>
            <tr>
              <th>Temperature Low |</th>
              <th>Avg Temp |</th>
              <th>Temperature High</th>
            </tr>
            <tr>
              <td>{props.user.weather_forecast.temp_lo}</td>
              <td>{props.user.weather_forecast.avg_temp}</td>
              <td>{props.user.weather_forecast.temp_hi}</td>
            </tr>
          </tbody>
        </table>

        <p>{props.user.weather_forecast.percip_range}</p>

      <Link to="/">
        <button onClick={e=>logOut()}>Log Out</button>
      </Link>
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
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))
