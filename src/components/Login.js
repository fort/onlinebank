import React, { Component } from 'react';
import Validator from '../libs/Validator';

//TODO: storing and retrieving from network
const USERS = {};
USERS['user_1'] = 'pass';
USERS['user_2'] = 'pass';
USERS['user_3'] = 'pass';


//TODO: move to helpers
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

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
      initialLoading : true,
      logged: false,
      login: '',
      password: '',
      errors: {},
    }
    this.errors = {};

    this.validateRules = {
      'login': {
        'required' : true,
        'rules': {
          'maxLength': {
            value: 6,
            errorMessage: " Login must not exceed then 2 symbols",
          },
          'minLength': {
            value: 2,
            errorMessage: " Login must be more then 2 symbols",
          },
        }
      },

      'password': {
        'required' : true,
        'rules': {
          'maxLength': {
            value: 6,
            errorMessage: " Password must not exceed then 2 symbols",
          },
          'minLength': {
            value: 2,
            errorMessage: " Password must be more then 2 symbols",
          },
        }
      },
    }

    Validator.setRules(this.validateRules);

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

  /**
   * Validate form, append element's errors. Updates state with errors
   * @returns {boolean}
   */
  formValidate() {
    this.errors = {};
    let { login, password } = this.state;

    let valid = true;
    let ret = true;

    Validator.setData({login, password});
    valid = Validator.validate();

    if( valid ) {
      //Authentication process
      //TODO: make async network request
      if(!(USERS.hasOwnProperty(login) && USERS[login] === password) ) {
        this.setState( {errors: {general:"authentication faild!"}} );
        ret = false;
      }
    }else {
      ret = false;
      this.setState( {errors: Validator.getErrorMessages()} );
    }
    return ret;
  }

  auth(e) {
    this.setState({logged:false});
    let valid = this.formValidate();
    if( valid ) {
      this.setState({logged:true});
    }
  }

  onBlurField(e) {
    let {name, value} = e.target,
      valid = true;
    let { login, password } = this.state;
    Validator.setData({login, password});

    valid = valid = Validator.validate(name);
    if( !valid ) {
      this.setState( {errors: Validator.getErrorMessages()} );
    } else{
      //TODO: correct clear field error message

      let newStateErrors = this.state.errors;
      delete newStateErrors[name];
      this.setState(newStateErrors);
    }

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
               onBlur={this.onBlurField.bind(this)}

               onFocus={(event) => {
                 // console.log(event.target);
               }}
        />
        {
          this.state.errors.login ?
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
               onBlur={this.onBlurField.bind(this)}
               onFocus={(event) => {
                 // console.log(event.target);
               }}
        />

        {
          this.state.errors.password ?
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