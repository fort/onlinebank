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

    this.validateRules = {
      'login': {
        'required' : true,
        'rules': {
          'maxLength': {
            value: 6,
            errorMessage: " must not exceed then 2 symbols",
          },
          'minLength': {
            value: 2,
            errorMessage: " must be more then 2 symbols",
          },
        }
      },

      'password': {
        'required' : true,
        'rules': {
          'maxLength': {
            value: 6,
            errorMessage: " must not exceed then 2 symbols",
          },
          'minLength': {
            value: 2,
            errorMessage: " must be more then 2 symbols",
          },
        }
      },

    }


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

    if( Object.size(this.validateRules) ) {
      for( let fieldKey in this.validateRules ) {

        if( this.validateRules[fieldKey]['required'] ) {
          for( let ruleName in this.validateRules[fieldKey]['rules'] ) {
            let ruleParams = this.validateRules[fieldKey]['rules'][ruleName];
            console.log("rule name ", ruleName);
            console.log("rule params ", ruleParams);

            switch ( fieldKey ) {
              case 'login':{
                this.validateField('login', login, ruleName, ruleParams );
                break;
              }
              case 'password':{
                this.validateField('password', password, ruleName, ruleParams );
                break;
              }
              default:{
              }
            }
          }
        }
      }
    }

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

    if( Object.size(this.validateRules) ) {

      if( this.validateRules.hasOwnProperty(name) && this.validateRules[name]['required'] ) {
        for( let ruleName in this.validateRules[name]['rules'] ) {
          let ruleParams = this.validateRules[name]['rules'][ruleName];

          switch ( name ) {
            case 'login':{
              this.validateField('login', value, ruleName, ruleParams );
              break;
            }
            case 'password':{
              this.validateField('password', value, ruleName, ruleParams );
              break;
            }
            default:{
            }
          }
        }
      }
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