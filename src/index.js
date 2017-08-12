import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import * as actionTypes from './actionTypes/';

// console.log(reducers);

let store = createStore(reducers);

store.dispatch({
  type: actionTypes.LOGIN,
  payload: {
    login: 'login',
    pass: 'pass',
  }
});

// store.subscribe( (state) => {
//   console.log( state.getState() );
// } );

// console.log(store.getState());

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
