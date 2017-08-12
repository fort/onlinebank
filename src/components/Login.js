import React, { Component } from 'react';

const USERS = {};
USERS['user_1'] = 'pass';
USERS['user_2'] = 'pass';
USERS['user_3'] = 'pass';

const Notification = (paylaod) => {
  let {type, message} = paylaod;
  let className = `notification ${type}`;
  return (
    <div className={className}>{message}</div>
  )
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      login: '',
      password: '',
      errors: {},
    }
    this.errors = {};
  }

  onChange(event) {
    let {name, value} = event.target;
    let state = {};
    state[name] = value;
    this.setState(state);
  }

  setError(key, message) {
    if(!this.errors.hasOwnProperty(key)) {
      this.errors[key] = [];
    }
    this.errors[key].push(message);
  }

  auth(e) {
    this.setState({logged:false});
    this.errors = {};
    let {login, password, errors} = this.state;

    let updateState = '';
    let valid = true;
    let ret = true;

    //VALIDATION
    if( login.length < 4 ){
      this.setError('login', 'login must not empty or less then 4 chars');
      valid = false;
    }

    if( password.length < 4 ){
      this.setError('password', 'password must not empty or less then 4 chars');
      valid = false;
    }

    if( valid ) {
      if(!(USERS.hasOwnProperty(login) && USERS[login] === password) ) {
        this.setError('general', 'authentication faild!');
        ret = false;
      }
    }

    if( ret && valid ) {
      this.setState({logged:true});
    }
    this.setState({errors: this.errors});
  }

  render() {
    let validForm = Object.getOwnPropertyNames(this.state.errors).length === 0;

    let NotificationBlock = '';
    if ( this.state.errors.hasOwnProperty('general') &&  Object.getOwnPropertyNames(this.state.errors.general).length !== 0 ) {
      NotificationBlock = <Notification type="error" message={this.state.errors.general} />
    }

    if( this.state.logged ) {
      NotificationBlock = <Notification type="success" message="Authentication is successfull!" />
    }

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
        {
          !validForm ?
            <span className="error_field">{this.state.errors.login}</span>
            : ''
        }

        <input type="password" name="password"
               placeholder="your password"
               onChange={this.onChange.bind(this)}
               onKeyPress={ (event)=>{
                 if( 'Enter' === event.key ) {
                   this.auth();
                 }
               } }
        />

        {
          !validForm ?
            <span className="error">{this.state.errors.password}</span>
            : ''
        }

        <button name="submit" onClick={this.auth.bind(this)}>SignIn</button>

        {
          NotificationBlock
        }

      </div>
    )
  }
}

export default Login;