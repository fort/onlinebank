import * as actionTypes from '../actionTypes/';

const initialState = {
  loggin: false,
}

export default function App(state=initialState, action) {

  let newState;
  switch (action.type) {
   case actionTypes.LOGIN:
   newState = {...state, ...action.payload};
   break;
  default: {
    newState = state;
    }
  }
  // console.log(newState);
  return newState;
}
