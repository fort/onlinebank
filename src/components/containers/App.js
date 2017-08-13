import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/index';
import Profile from '../Profile';
import Login from '../Login';
import '../../App.css';

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
        <div className="App-left">
          {/*HERE will be draggable widgets*/}
        </div>
        <div className="App-content">
          {screen}
        </div>
        <div className="App-right">
          {/*HERE will be devTool bar*/}
        </div>
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
