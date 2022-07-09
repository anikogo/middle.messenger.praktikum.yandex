export function registerTemplate(): string {
  return /*template*/`
    <main>
      <div class="data-entry-field">
        <h1>Registration</h1>
        {{{ Input
          name="firstName"
          idName="firstName"
          className="input__main-input js-input-validation"
          pholderText="first name"
          onBlur=checkFirstNameInput
          onFocus=checkFirstNameInput
          onInput=handleFirstNameInput
        }}}
        {{{ Error idName="firstNameError" className="error_hidden"}}}
        {{{ Input
          name="secondName"
          idName="secondName"
          className="input__main-input js-input-validation"
          pholderText="second name"
          onBlur=checkSecondNameInput
          onFocus=checkSecondNameInput
          onInput=handleSecondNameInput
        }}}
        {{{ Error idName="secondNameError" className="error_hidden"}}}
        {{{ Input
          name="login"
          idName="login"
          className="input__main-input js-input-validation"
          pholderText="login"
          onBlur=checkLoginEvent
          onFocus=checkLoginEvent
          onInput=handleLoginInput
        }}}
        {{{ Error idName="loginError" className="error_hidden"}}}
        {{{ Input
          name="email"
          idName="email"
          className="input__main-input js-input-validation"
          pholderText="email"
          onBlur=checkEmailEvent
          onFocus=checkEmailEvent
          onInput=handleEmailInput
        }}}
        {{{ Error idName="emailError" className="error_hidden"}}}
        {{{ Input
          name="phone"
          idName="phone"
          className="input__main-input js-input-validation"
          pholderText="phone"
          onBlur=checkPhoneEvent
          onFocus=checkPhoneEvent
          onInput=handlePhoneInput
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
          onInput=handlePasswordInput
        }}}
        {{{ Error idName="passwordError" className="error_hidden"}}}
        {{{ Input
          name="rPassword"
          idName="rPassword"
          className="input__main-input js-input-validation"
          pholderText="repeat password"
          inType="password"
          onBlur=checkRetypePwdEvent
          onFocus=checkRetypePwdEvent
          onInput=handleRetypePasswordInput
        }}}
        {{{ Error idName="rPasswordError" className="error_hidden"}}}
        <div class="button__row-container">
          {{{ Button label="Sign in" className="button__secondary-button rounding" onClick=goToLogin }}}
          {{{ Button label="Register" className="button__primary-button rounding" onClick=handleSubmit }}}
        </div>
      </div>
    </main>
  `;
};
