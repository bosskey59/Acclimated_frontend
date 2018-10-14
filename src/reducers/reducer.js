
let defaultState = {
  forecast: {},
  suggestion: {},
  user: null
}

export function reducer(state=defaultState, action){
  console.log(action, state);
  switch (action.type) {
    case "SET_USER":
      return {...state, user: action.payload }
      break;

    default: return state

  }
}
