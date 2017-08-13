import React, { Component } from 'react';

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
    let {login, password, errors} = this.state;

    let valid = true;
    let ret = true;

    this.validateField('login', login, 'maxLength', {value:6, errorMessage: "login must not exceed 6 symbol"} );
    this.validateField('login', login, 'minLength', {value:2, errorMessage: "login must be more then 2 symbol"} );

    this.validateField('password', password, 'maxLength', {value:6, errorMessage: "password must not exceed 6 symbol"} );
    this.validateField('password', password, 'minLength', {value:2, errorMessage: "password must be more then 2 symbol"} );


    //all fields validation are correct
    if( !Object.size(this.errors) ) {
      //Authentication process
      //TODO: make async network request
      if(!(USERS.hasOwnProperty(login) && USERS[login] === password) ) {
        this.setError('general', 'authentication faild!');
        ret = false;
      }
    } else { /* error fields validation*/
      ret = false;
    }

    this.setState({errors: this.errors});

    return ret;
  }

  /**
   * Validate form element, collects error message appending to array
   *
   * @param fieldName
   * @param fieldValue
   * @param validatorName
   * @param Object params {value: 'value', errorMessage: 'errorMessage' }
   * @returns {boolean}
   */
  validateField(fieldName, fieldValue, validatorName, params) {
    let ret = true;

    switch (validatorName) {
      case 'maxLength': {
        if( fieldValue.length > params.value ) {
          ret = false;
          this.setError(fieldName, params.errorMessage);
        }else{
          delete this.errors[fieldName];
        }
        break;
      }
      case 'minLength': {
        if( fieldValue.length < params.value ) {
          ret = false;
          this.setError(fieldName, params.errorMessage);
        }else {
          delete this.errors[fieldName];
        }
        break;
      }
      default:{

      }
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
    let {name, value} = e.target;

    this.validateField(name, value, 'maxLength', {value:6, errorMessage: name +" must not exceed 6 symbol"} );
    this.validateField(name, value, 'minLength', {value:2, errorMessage: name + " must be more then 2 symbol"} );

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