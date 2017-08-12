import React, { Component } from 'react';

const USERS = {};
USERS['user_1'] = 'pass';
USERS['user_2'] = 'pass';
USERS['user_3'] = 'pass';

//TODO: store, display error input

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    }
  }

  onChange(event) {
    let {name, value} = event.target;
    let state = {};
    state[name] = value;
    this.setState(state);
  }

  auth(e) {
    let {login, password} = this.state;

    if( !USERS.hasOwnProperty(login) ){
      console.log('login not found!');
      return false;
    }

    if( !this.state.login ){
      console.log('login must not empty');
      return false;
    }

    if( !this.state.password ){
      console.log('password must not empty');
      return false;
    }

    if( USERS[login] !== password ) {
      console.log('password incorrect!');
      return false;
    }

    console.log('You have authenticated succesfully!');
    return true;

  }

  render() {
    return(
      <div className="Login-screen">
        <div className="Login-screen-title">Login screen</div>
        <input type="text" name="login"
               placeholder="your login"
               onChange={this.onChange.bind(this)}
               onKeyPress={ (event)=>{
                 if( 'Enter' === event.key ) {
                   this.auth();
                 }
               } }
        />
        <input type="password" name="password"
               placeholder="your password"
               onChange={this.onChange.bind(this)}
               onKeyPress={ (event)=>{
                 if( 'Enter' === event.key ) {
                   this.auth();
                 }
               } }
        />
        <button name="submit" onClick={this.auth.bind(this)}>SignIn</button>
      </div>
    )
  }
}

export default Login;