export function registerTemplate(): string {
  return /*template*/`
    <main>
      <div class="data-entry-form data-entry-form__container flex-column">
        <h1>Registration</h1>
        {{{ Input
          name="firstName"
          idName="firstName"
          className="data-entry-form__input js-input-validation"
          pholderText="first name"
          onBlur=checkFirstNameInput
          onFocus=checkFirstNameInput
          onInput=handleFirstNameInput
        }}}
        {{{ Error idName="firstNameError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="secondName"
          idName="secondName"
          className="data-entry-form__input js-input-validation"
          pholderText="second name"
          onBlur=checkSecondNameInput
          onFocus=checkSecondNameInput
          onInput=handleSecondNameInput
        }}}
        {{{ Error idName="secondNameError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="login"
          idName="login"
          className="data-entry-form__input js-input-validation"
          pholderText="login"
          onBlur=checkLoginEvent
          onFocus=checkLoginEvent
          onInput=handleLoginInput
        }}}
        {{{ Error idName="loginError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="email"
          idName="email"
          className="data-entry-form__input js-input-validation"
          pholderText="email"
          onBlur=checkEmailEvent
          onFocus=checkEmailEvent
          onInput=handleEmailInput
        }}}
        {{{ Error idName="emailError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="phone"
          idName="phone"
          className="data-entry-form__input js-input-validation"
          pholderText="phone"
          onBlur=checkPhoneEvent
          onFocus=checkPhoneEvent
          onInput=handlePhoneInput
        }}}
        {{{ Error idName="phoneError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="password"
          idName="password"
          className="data-entry-form__input js-input-validation"
          pholderText="password"
          inType="password"
          onBlur=checkPwdEvent
          onFocus=checkPwdEvent
          onInput=handlePasswordInput
        }}}
        {{{ Error idName="passwordError" className="data-entry-form__input-error hidden"}}}
        {{{ Input
          name="rPassword"
          idName="rPassword"
          className="data-entry-form__input js-input-validation"
          pholderText="repeat password"
          inType="password"
          onBlur=checkRetypePwdEvent
          onFocus=checkRetypePwdEvent
          onInput=handleRetypePasswordInput
        }}}
        {{{ Error idName="rPasswordError" className="data-entry-form__input-error hidden"}}}
        <div class="data-entry-form__button-container flex">
          {{{ Button
            label="Sign in"
            className="data-entry-form__button data-entry-form__button_secondary rounding"
            onClick=handleButtonLogin
          }}}
          {{{ Button
            label="Register"
            className="data-entry-form__button data-entry-form__button_primary rounding"
            onClick=handleButtonSubmit
          }}}
        </div>
      </div>
    </main>
  `;
};
