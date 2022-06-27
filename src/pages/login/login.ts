import Block from "../../utils/Block";
import  {validate, submitAllFields}  from "../../utils/validate";

export default class LoginPage extends Block {
  constructor(props?: any) {
    super({...props,
      checkLoginEvent: validate("login"),
      checkPwdEvent: validate("password"),
      checkSubmitEvent: () => submitAllFields(this.element?.querySelectorAll(".js-input-validation")),
    });
  };

  render() {
    return /*template*/`
      <main>
        <div class="data-entry-field">
          <h1>Authorization</h1>
          {{{ Input
            name="login" 
            idName="login" 
            className="input__main-input js-input-validation" 
            pholderText="login" 
            onBlur=checkLoginEvent 
            onFocus=checkLoginEvent 
          }}}
          {{{ Error idName="loginError" className="error_hidden"}}}
          {{{ Input
            name="password" 
            idName="password" 
            className="input__main-input js-input-validation" 
            pholderText="password"
            onBlur=checkPwdEvent 
            onFocus=checkPwdEvent
            inType="password"
          }}}
          {{{ Error idName="passwordError" className="error_hidden"}}}
          <div class="button__row-container">
            {{{ Button label="Sign in" className="button__primary-button rounding" onClick=checkSubmitEvent }}}
            {{{ Button label="Register" className="button__secondary-button rounding" }}}
          </div>        
        </div>
      </main>
    `;
  };
};