import React, { Component } from 'react';
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

export default App;
