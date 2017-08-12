import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import Profile from './Profile';
import Login from './Login';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    }
  }

  render() {
    const screen = this.state.logged ? <Profile /> : <Login />;
    return (
      <div className="App">
        {screen}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
