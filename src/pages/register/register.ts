import Block from "../../utils/Block";
import { validate, submitAllFields } from "../../utils/validate";

export default class RegisterPage extends Block {
  constructor(props?: any) {
    super({...props,
      checkLoginEvent: validate("login"),
      checkNameEvent: validate("name"),
      checkPwdEvent: validate("password"),
      checkEmailEvent: validate("email"),
      checkPhoneEvent: validate("phone"),
      checkSubmitEvent: () => submitAllFields(this.element?.querySelectorAll(".js-input-validation")),
    });
  };

  render() {
    return /*template*/`
      <main>
        <div class="data-entry-field">
          <h1>Registration</h1>
          {{{ Input
            name="firstName"
            idName="firstName"
            className="input__main-input js-input-validation"
            pholderText="first name"
            onBlur=checkNameEvent
            onFocus=checkNameEvent
          }}}
          {{{ Error idName="firstNameError" className="error_hidden"}}}
          {{{ Input
            name="secondName"
            idName="secondName"
            className="input__main-input js-input-validation"
            pholderText="second name"
            onBlur=checkNameEvent
            onFocus=checkNameEvent
          }}}
          {{{ Error idName="secondNameError" className="error_hidden"}}}
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
            name="email"
            idName="email"
            className="input__main-input js-input-validation"
            pholderText="email"
            onBlur=checkEmailEvent
            onFocus=checkEmailEvent
          }}}
          {{{ Error idName="emailError" className="error_hidden"}}}
          {{{ Input
            name="phone"
            idName="phone"
            className="input__main-input js-input-validation"
            pholderText="phone"
            onBlur=checkPhoneEvent
            onFocus=checkPhoneEvent
          }}}
          {{{ Error idName="phoneError" className="error_hidden"}}}
          {{{ Input
            name="password"
            idName="password"
            className="input__main-input js-input-validation"
            pholderText="password"
            inType="password"
            onBlur=checkPwdEvent
            onFocus=checkPwdEvent
          }}}
          {{{ Error idName="passwordError" className="error_hidden"}}}
          {{{ Input
            name="rPassword"
            idName="rPassword"
            className="input__main-input js-input-validation"
            pholderText="repeat password"
            inType="password"
            onBlur=checkPwdEvent
            onFocus=checkPwdEvent
          }}}
          {{{ Error idName="rPasswordError" className="error_hidden"}}}
          <div class="button__row-container">
            {{{ Button label="Sign in" className="button__secondary-button rounding" }}}
            {{{ Button label="Register" className="button__primary-button rounding" onClick=checkSubmitEvent }}}
          </div>
        </div>
      </main>
    `;
  };
};
