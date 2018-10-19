import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import '../index.css';


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
        <p>Summary:{props.user.weather_forecast.summary}</p>
        <p>Precipatation:{props.user.weather_forecast.percip_range}</p>
        {props.user.clothing_suggestion.item_1 == "" || props.user.clothing_suggestion.item_1 == null ? null:
          <div className="back">
            <p>{props.user.clothing_suggestion.item_1}</p>
            <img src={require(`../images/${props.user.clothing_suggestion.item_1}.png`)} />
          </div>
        }

          {props.user.clothing_suggestion.accessory_1 == "" || props.user.clothing_suggestion.accessory_1 == null ? null:
            <div className="back">
              <p>{props.user.clothing_suggestion.accessory_1}</p>
              <img src={require(`../images/${props.user.clothing_suggestion.accessory_1}.png`)} />
            </div>
          }

      <Link to="/">
        <button onClick={props.logout}>Log Out</button>
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
    logout: () => dispatch({type:"LOGOUT"})
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))


// <div>
//   <img src={require(`../images/${props.user.clothing_suggestion.item_1}.png`)} />
//   <p>{props.user.clothing_suggestion.item_1}</p>
// </div>
