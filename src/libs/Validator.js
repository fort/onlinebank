class ValidatorClass {
  constructor(props={}) {
    this.props = props;
    this.rules = [];
    this.formData = [];
    this.errors = {};
  }

  setError(key, message) {
    if(!this.errors.hasOwnProperty(key)) {
      this.errors[key] = [];
    }
    this.errors[key].push(message);
  }

  setRules(_rules) {
    this.rules = _rules;
  }

  setRule(name, params) {
  }

  setData(_data) {
    this.formData = _data;
  }

  validate(fieldKey) {

    if( Object.size(this.rules) ) {

      //TODO: remove duplicated code
      if(fieldKey) {
        if( this.rules.hasOwnProperty(fieldKey) ) {
          if( this.rules[fieldKey]['required'] ) {
            for( let validatorName in this.rules[fieldKey]['rules'] ) {
              let validatorParams = this.rules[fieldKey]['rules'][validatorName];
              this.validateField(fieldKey, this.formData[fieldKey], validatorName, validatorParams );
            }
          }
        }
      }else {
        for( let fieldKey in this.rules ) {
          if( this.rules[fieldKey]['required'] ) {
            for( let validatorName in this.rules[fieldKey]['rules'] ) {
              let validatorParams = this.rules[fieldKey]['rules'][validatorName];
              this.validateField(fieldKey, this.formData[fieldKey], validatorName, validatorParams );
            }
          }
        }
      }

    }

    return Object.size(this.errors) === 0;
  }

  validateField(fieldName, fieldValue, validatorName, validatorParams) {
    let ret = true;

    //TODO: create separate Validator and call it here
    switch (validatorName) {
      case 'maxLength': {
        if( fieldValue.length > validatorParams.value ) {
          ret = false;
          this.setError(fieldName, validatorParams.errorMessage);
        }else{
          delete this.errors[fieldName];
        }
        break;
      }
      case 'minLength': {
        if( fieldValue.length < validatorParams.value ) {
          ret = false;
          this.setError(fieldName, validatorParams.errorMessage);
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

  getErrorMessages() {
    return this.errors;
  }
}

export default new ValidatorClass();