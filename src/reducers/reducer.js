
let defaultState = {
  user: null
}

export function reducer(state=defaultState, action){
  console.log(action, state);
  switch (action.type) {
    case "SET_USER":
      return {...state, user: action.payload }
      break;
    case "LOGOUT":
      localStorage.token=""
      return {...state, user: null}
      break;

    default: return state

  }
}
